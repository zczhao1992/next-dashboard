"use client";

import { SidebarItem } from "./SidebarItem";
import { Logo } from "./Logo";

export const Sidebar = () => {
  return (
    <div className="sticky top-4 h-[calc(100vh-48px)]">
      <Logo />
      <ul className="flex flex-col">
        <SidebarItem label="仪表板" />
        <SidebarItem label="用户管理" />
      </ul>
    </div>
  );
};
