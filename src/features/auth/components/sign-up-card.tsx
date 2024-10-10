import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { DottedSeparator } from "@/components/dotted-separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SignUpCard = () => {
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
        <form className="space-y-4">
          <Input
            required
            type="text"
            value={""}
            onChange={() => {}}
            placeholder="输入姓名"
            disabled={false}
          />
          <Input
            required
            type="email"
            value={""}
            onChange={() => {}}
            placeholder="输入邮箱地址"
            disabled={false}
          />
          <Input
            required
            type="password"
            value={""}
            onChange={() => {}}
            placeholder="输入密码"
            min={8}
            max={256}
            disabled={false}
          />
          <Button disabled={false} size="lg" className="w-full">
            登录
          </Button>
        </form>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          className="w-full"
          disabled={false}
          variant="secondary"
          size="lg"
        >
          <FcGoogle className="mr-2 size-5" />
          使用Google账号
        </Button>
        <Button
          className="w-full"
          disabled={false}
          variant="secondary"
          size="lg"
        >
          <FaGithub className="mr-2 size-5" />
          使用Github账号
        </Button>
      </CardContent>
    </Card>
  );
};
