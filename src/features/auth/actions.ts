"use server";

import { cookies } from "next/headers";
import {
  Client,
  Account,
  Storage,
  Models,
  Databases,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageType,
  type Users as UsersType,
} from "node-appwrite";
import { AUTH_COOKIE } from "./constants";

export const getCurrent = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = await cookies().get(AUTH_COOKIE);

    if (!session) return null;

    client.setSession(session.value);

    const account = new Account(client);

    return await account.get();
  } catch {
    return null;
  }
};
