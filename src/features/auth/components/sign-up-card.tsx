"use client";

import { z } from "zod";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { DottedSeparator } from "@/components/dotted-separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";

// const registerSchema = z.object({
//   name: z.string().trim().min(1, "请输入名称"),
//   email: z.string().min(1, "请输入邮箱").email(),
//   password: z.string().min(6, "密码不能少于6位"),
// });

export const SignUpCard = () => {
  const { mutate, isPending } = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutate({ json: values });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">注册</CardTitle>

        <CardDescription>
          注册即表示您同意我们的
          <Link href="/privacy">
            <span className="text-blue-700">隐私条款</span>
          </Link>{" "}
          和{" "}
          <Link href="/terms">
            <span className="text-blue-700">服务条款</span>
          </Link>
        </CardDescription>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="输入名称" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="email" placeholder="输入邮箱地址" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="password" placeholder="输入密码" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} size="lg" className="w-full">
              注册
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          className="w-full"
          disabled={isPending}
          variant="secondary"
          size="lg"
          onClick={() => signUpWithGoogle()}
        >
          <FcGoogle className="mr-2 size-5" />
          使用Google账号
        </Button>
        <Button
          className="w-full"
          disabled={isPending}
          variant="secondary"
          size="lg"
          onClick={() => signUpWithGithub()}
        >
          <FaGithub className="mr-2 size-5" />
          使用Github账号
        </Button>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          已有账户？{" "}
          <Link href="/sign-in">
            <span className="text-blue-700">登录</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
