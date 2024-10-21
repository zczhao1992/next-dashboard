import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { Pen } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { OverviewProperty } from "@/features/tasks/components/overview-property";
import { TaskDate } from "./task-date";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

interface TaskOverviewProps {
  task: Task;
}

export const TaskOverview = ({ task }: TaskOverviewProps) => {
  const { open } = useEditTaskModal();

  const statusMap = {
    BACKLOG: "待开始",
    TODO: "未完成",
    IN_PROGRESS: "进行中",
    IN_REVIEW: "审核中",
    DONE: "已完成",
  };

  return (
    <div className=" flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4 ">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold"> 详情 </p>
          <Button
            onClick={() => open(task.$id)}
            size={"sm"}
            variant={"secondary"}
          >
            <Pen className="size-4 mr-2" />
            编辑
          </Button>
        </div>
        <DottedSeparator className="my-3" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="成员">
            <MemberAvatar name={task.assignee.name} className="size-6" />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="截止日期">
            <TaskDate value={task.dueDate} className="text-sm font-medium" />
          </OverviewProperty>
          <OverviewProperty label="状态">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(statusMap[task.status])}
            </Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};
