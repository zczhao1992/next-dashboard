import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().trim().min(1, "项目名称必填"),
  image: z
    .union([
      z.instanceof(globalThis.File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
  workspaceId: z.string(),
});
