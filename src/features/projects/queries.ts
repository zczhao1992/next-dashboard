import { createSessionClient } from "@/lib/appwrite";

import { getMember } from "@/features/members/utils";
import { MEMBERS_ID, DATABASE_ID, PROJECTS_ID } from "@/config";
import { Project } from "./types";

interface GetPorjectProps {
  projectId: string;
}

export const getProject = async ({ projectId }: GetPorjectProps) => {
  const { account, databases } = await createSessionClient();

  const user = await account.get();

  const project = await databases.getDocument<Project>(
    DATABASE_ID,
    PROJECTS_ID,
    projectId
  );

  const member = await getMember({
    databases,
    userId: user.$id,
    workspaceId: project.workspaceId,
  });

  if (!member) {
    throw new Error("账户错误");
  }

  return project;
};
