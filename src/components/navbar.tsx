"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { usePathname, useRouter } from "next/navigation";

const pathnameMap = {
  tasks: {
    title: "任务",
  },
  projects: {
    title: "项目",
  },
};

const defaultMap = {
  title: "首页",
};

export const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname?.split("/");

  const pathnameMapKey = pathnameParts?.[3] as keyof typeof pathnameMap;
  const { title } = pathnameMap[pathnameMapKey] || defaultMap;

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {/* <p className="text-muted-foreground">再此处添加任务</p> */}
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
