import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "@/components/dotted-separator";
import { Navigation } from "./navigation";

import { WorkspaceSwitcher } from "./workspace-switcher";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/" className="flex items-end">
        <Image src="/logo.svg" height={30} width={30} alt="Logo" />
        <span className="text-xl ml-2 font-semibold tracking-tight">
          Next-Dashboard
        </span>
      </Link>
      <DottedSeparator className="my-4" />

      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
};
