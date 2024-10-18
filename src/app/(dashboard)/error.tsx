"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
      <AlertTriangle className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">错误</p>
      <Button variant="secondary" size="sm">
        <Link href="/">回到首页</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
