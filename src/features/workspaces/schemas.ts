import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "工作区名称必填"),
  // image: z
  //   .union([
  //     z.instanceof(globalThis.File),
  //     z.string().transform((value) => (value === "" ? undefined : value)),
  //   ])
  //   .optional(),
  image: z.string().optional(),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "工作区名称必填").optional(),
  // image: z
  //   .union([
  //     z.instanceof(globalThis.File),
  //     z.string().transform((value) => (value === "" ? undefined : value)),
  //   ])
  //   .optional(),
  image: z.string().optional(),
});
