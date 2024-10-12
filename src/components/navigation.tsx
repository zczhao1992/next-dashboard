import Link from "next/link";
import { SettingsIcon, UserIcon } from "lucide-react";
import {
  GoHome,
  GoHomeFill,
  GoCheckCircle,
  GoCheckCircleFill,
} from "react-icons/go";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "首页",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "任务",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "设置",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "成员",
    href: "/members",
    icon: UserIcon,
    activeIcon: UserIcon,
  },
];

export const Navigation = () => {
  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const isActive = false;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
