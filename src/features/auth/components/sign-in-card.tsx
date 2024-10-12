"use client";

import { z } from "zod";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

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
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";

// const formSchema = z.object({
//   email: z.string().min(1, "请输入邮箱").email(),
//   password: z.string().min(6, "密码不能少于6位"),
// });

export const SignInCard = () => {
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">欢迎登录</CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            {/* <Input
              required
              type="password"
              value={""}
              onChange={() => {}}
              placeholder="输入密码"
              min={8}
              max={256}
              disabled={false}
            /> */}
            <Button disabled={isPending} size="lg" className="w-full">
              登录
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
        >
          <FcGoogle className="mr-2 size-5" />
          使用Google账号
        </Button>
        <Button
          className="w-full"
          disabled={isPending}
          variant="secondary"
          size="lg"
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
          没有账户？{" "}
          <Link href="/sign-up">
            <span className="text-blue-700">注册</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
