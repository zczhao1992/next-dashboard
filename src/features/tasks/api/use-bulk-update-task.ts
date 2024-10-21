import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.tasks)["bulk-update"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)["bulk-update"]["$post"]
>;

export const useBulkUpdateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks["bulk-update"]["$post"]({ json });

      if (!response.ok) {
        throw new Error(" 更新失败 ");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("更新成功");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("更新失败");
    },
  });

  return mutation;
};
