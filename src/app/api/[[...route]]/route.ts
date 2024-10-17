import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";
import members from "@/features/members/server/route";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", auth)
  .route("/workspaces", workspaces)
  .route("/members", members);

app
  .get("/hello", (c) => {
    return c.json({ hello: "dd" });
  })
  .get("/project/:projectId", (c) => {
    const projectId = c.req.param("projectId");
    return c.json({ project: projectId });
  });

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
