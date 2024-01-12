"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/user", {
      method: "GET",
    });
    const data = await res.json();

    console.log("daaaaa", data);

    router.push("/dashboard", { scroll: false });
  };

  return (
    <div className="m-auto w-2/6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">next-dashboard</CardTitle>
          <CardDescription>next-dashboard练习版</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            登录
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
