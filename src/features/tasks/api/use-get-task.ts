import { useQuery } from "@tanstack/react-query";
import { TaskStatus } from "../types";
import { client } from "@/lib/rpc";

interface UseGetTaskProps {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatus | null;
  assigneeId?: string | null;
  search?: string | null;
  dueDate?: string | null;
}

export const useGetTask = ({
  workspaceId,
  projectId,
  status,
  assigneeId,
  search,
  dueDate,
}: UseGetTaskProps) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      status,
      assigneeId,
      search,
      dueDate,
    ],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          status: status ?? undefined,
          assigneeId: assigneeId ?? undefined,
          search: search ?? undefined,
          dueDate: dueDate ?? undefined,
        },
      });

      if (!response.ok) {
        throw new Error("获取任务列表失败");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
