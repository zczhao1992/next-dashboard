"use client";

import { z } from "zod";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateWorkspaceSchema } from "../schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { DottedSeparator } from "@/components/dotted-separator";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { useResetInviteCode } from "../api/use-reset-invite-code";

interface EditWorkspaceFormPorps {
  onCancel?: () => void;
  initialValues: Workspace;
}

export const EditWorkspaceForm = ({
  onCancel,
  initialValues,
}: EditWorkspaceFormPorps) => {
  const { mutate, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();

  const { mutate: resetInviteCode, isPending: isResettingInviteCode } =
    useResetInviteCode();

  const router = useRouter();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "删除工作区",
    "此操作不可撤销",
    "destructive"
  );

  const [ResetDialog, confirmReset] = useConfirm(
    "重置邀请链接",
    "这将使当前的邀请链接无效",
    "destructive"
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    deleteWorkspace(
      {
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: () => {
          window.location.href = "/";
        },
      }
    );
  };

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      // image: values.image instanceof File ? values.image : "",
      image: "",
    };
    console.log({ values, finalValues });
    mutate({ form: finalValues, param: { workspaceId: initialValues.$id } });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", "");
    }
  };

  const fullInviteLink = () => {
    const isBrowser = () => typeof window !== "undefined";
    if (isBrowser()) {
      return `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;
    }
    return "";
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard
      .writeText(fullInviteLink())
      .then(() => toast.success("邀请链接已复制到剪贴板"));
  };

  const handleResetInviteCode = async () => {
    const ok = await confirmReset();

    if (!ok) return;

    resetInviteCode({
      param: { workspaceId: initialValues.$id },
    });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />

      <ResetDialog />
      {/* 修改工作区 */}
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${initialValues.$id}`)
            }
          >
            <ArrowLeftIcon className="size-4 mr-2" />
            返回
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>

        <div className="px-7">
          <DottedSeparator />
        </div>

        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>工作区名称</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="输入工作区名称" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              alt="Logo"
                              fill
                              className="object-cover"
                              src={""}
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className="flex flex-col">
                          <p className="text-sm">工作区图标</p>
                          <p className="text-sm text-muted-foreground">
                            支持JPG, PNG, SVG, JPEG等格式, 不得大于1mb
                          </p>
                          <input
                            type="file"
                            accept=".jpg, .png, .jpeg, .svg"
                            className="hidden"
                            ref={inputRef}
                            onChange={handleImageChange}
                            disabled={isPending}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              variant="destructive"
                              disabled={isPending}
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange(null);

                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              删除图标
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              variant="teritary"
                              disabled={isPending}
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              上传图标
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <DottedSeparator className="py-7" />

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                  className={cn(!onCancel && "invisible")}
                >
                  取消
                </Button>

                <Button type="submit" size="lg" disabled={isPending}>
                  保存修改
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {/* 邀请成员 */}
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">邀请成员</h3>
            <p className="text-sm text-muted-foreground">
              使用邀请链接将成员添加到您的工作区。
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input disabled value={fullInviteLink()} />
                <Button
                  onClick={handleCopyInviteLink}
                  variant="secondary"
                  className="size-12"
                >
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>
            <DottedSeparator className="py-7" />
            <Button
              size="sm"
              variant="destructive"
              type="button"
              className="mt-6 w-fit ml-auto"
              disabled={isPending || isResettingInviteCode}
              onClick={handleResetInviteCode}
            >
              重置邀请链接
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 删除工作区 */}
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">删除工作区</h3>
            <p className="text-sm text-muted-foreground">
              删除工作区不可撤销，将删除所有相关的数据。
            </p>
            <Button
              size="sm"
              variant="destructive"
              type="button"
              className="mt-6 w-fit ml-auto"
              disabled={isPending || isDeletingWorkspace}
              onClick={handleDelete}
            >
              删除工作区
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
