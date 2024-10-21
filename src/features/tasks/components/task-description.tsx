import { useState } from "react";
import { Pen, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { DottedSeparator } from "@/components/dotted-separator";

import { useUpdateTask } from "../api/use-update-task";
import { Task } from "../types";

interface TaskDescriptionProps {
  task: Task;
}

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);
  const { mutate, isPending } = useUpdateTask();

  const handleSave = () => {
    mutate({
      json: { description: value },
      param: { taskId: task.$id },
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold"> 描述 </p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size={"sm"}
          variant={"secondary"}
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <Pen className="size-4 mr-2" />
          )}
          {isEditing ? "取消" : "编辑"}
        </Button>
      </div>
      <DottedSeparator className="my-3" />
      {isEditing ? (
        <div className=" flex flex-col gap-y-4">
          <Textarea
            placeholder="添加描述 ..."
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button
            size={"sm"}
            className="w-fit ml-auto"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "保存中..." : "保存"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">无描述</span>
          )}
        </div>
      )}
    </div>
  );
};
