import { snakeCaseToTitleCase } from "@/lib/utils";
import { TaskStatus } from "../types";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

interface KanbanColumnHeaderProps {
  board: TaskStatus;
  taskCount: number;
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: (
    <CircleDashedIcon className="size-[18px] text-pink-500" />
  ),
  [TaskStatus.TODO]: <CircleIcon className="size-[18px] text-yellow-500" />,
  [TaskStatus.IN_PROGRESS]: (
    <CircleDotDashedIcon className="size-[18px] text-red-500" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <CircleDotIcon className="size-[18px] text-green-300" />
  ),
  [TaskStatus.DONE]: (
    <CircleCheckIcon className="size-[18px] text-emerald-600" />
  ),
};

export const KanbanColumnHeader = ({
  board,
  taskCount,
}: KanbanColumnHeaderProps) => {
  const statusMap = {
    BACKLOG: "待办事项",
    TODO: "待开始",
    IN_PROGRESS: "进行中",
    IN_REVIEW: "审核中",
    DONE: "已完成",
  };

  const icon = statusIconMap[board];
  const { open } = useCreateTaskModal();

  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="text-sm font-medium">
          {snakeCaseToTitleCase(statusMap[board])}
        </h2>
        <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
          {taskCount}
        </div>
      </div>
      <Button onClick={open} variant={"ghost"} size={"icon"} className="size-5">
        <PlusIcon className="size-4 text-neutral-500" />
      </Button>
    </div>
  );
};
