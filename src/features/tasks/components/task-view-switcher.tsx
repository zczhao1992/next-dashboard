"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import { PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

export const TaskViewSwitcher = () => {
  const { open } = useCreateTaskModal();

  return (
    <Tabs className="flex-1 w-full border rounded-lg">
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

        <DottedSeparator className="my-4" />

        <>
          <TabsContent value="table" className="mt-0">
            table
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            kanban
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            calendar
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};
