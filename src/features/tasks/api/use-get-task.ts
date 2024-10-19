import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetTaskProps {
  workspaceId: string;
}

export const useGetTask = ({ workspaceId }: UseGetTaskProps) => {
  const query = useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: { workspaceId },
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
