"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTask } from "../api/use-get-task";
import { DataFilters } from "@/components/data-filters";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const TaskViewSwitcher = () => {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });

  const { open } = useCreateTaskModal();
  const workspaceId = useWorkspaceId();

  const [{ projectId, status, assigneeId, dueDate }] = useTaskFilters();

  const { data: tasks, isLoading: isLoadingTasks } = useGetTask({
    workspaceId,
    projectId,
    status,
    assigneeId,
    dueDate,
  });

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full border rounded-lg"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="table" className="h-8 w-full lg:w-auto">
              表格
            </TabsTrigger>
            <TabsTrigger value="kanban" className="h-8 w-full lg:w-auto">
              看板
            </TabsTrigger>
            <TabsTrigger value="calendar" className="h-8 w-full lg:w-auto">
              日历
            </TabsTrigger>
          </TabsList>

          <Button onClick={open} size="sm" className="w-full lg:w-auto">
            <PlusIcon className="size-4 mr-2" />
            新增
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        {/* 过滤 */}
        <DataFilters hideProjectFilters={false} />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              kanban
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              calendar
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
