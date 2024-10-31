import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().trim().min(1, "项目名称必填"),
  // image: z
  //   .union([
  //     z.instanceof(globalThis.File),
  //     z.string().transform((value) => (value === "" ? undefined : value)),
  //   ])
  //   .optional(),
  image: z.string().optional(),
  workspaceId: z.string(),
});

export const updateProjectSchema = z.object({
  name: z.string().trim().min(1, "项目名称必填").optional(),
  // image: z
  //   .union([
  //     z.instanceof(globalThis.File),
  //     z.string().transform((value) => (value === "" ? undefined : value)),
  //   ])
  //   .optional(),
  image: z.string().optional(),
});
