"use client";

import { redirect } from "next/navigation";

export default function Home() {
  const token = globalThis.localStorage.getItem("token");

  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
