import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface useGetTaskProps {
  taskId: string;
}

export const useGetTask = ({ taskId }: useGetTaskProps) => {
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"].$get({
        param: { taskId },
      });

      if (!response.ok) {
        throw new Error("获取任务失败");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
