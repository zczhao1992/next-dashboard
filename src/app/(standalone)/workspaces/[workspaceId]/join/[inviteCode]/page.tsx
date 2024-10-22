import { getCurrent } from "@/features/auth/queries";
import { WorkspaceIdJoinClient } from "./client";
import { redirect } from "next/navigation";

const WorkspaceIdJoinPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdJoinClient />;
};

export default WorkspaceIdJoinPage;
