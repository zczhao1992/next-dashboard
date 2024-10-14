"use client";

import { RiAddCircleFill } from "react-icons/ri";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

export const WorkspaceSwitcher = () => {
  const workspaceId = useWorkspaceId();

  const { open } = useCreateWorkspaceModal();

  const router = useRouter();
  const { data: workspaces } = useGetWorkspaces();

  const onSelect = (id: string) => {
    router.push(`/workspaces/${id}`);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">工作区</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>

      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="未选择工作区" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((item) => (
            <SelectItem key={item.$id} value={item.$id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <WorkspaceAvatar name={item.name} image={item.imageUrl} />
                <span className="truncate">{item.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
