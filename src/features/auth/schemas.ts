import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "请输入邮箱").email(),
  password: z.string().min(6, "密码不能少于6位"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "请输入名称"),
  email: z.string().min(1, "请输入邮箱").email(),
  password: z.string().min(6, "密码不能少于6位"),
});
