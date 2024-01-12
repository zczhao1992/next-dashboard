"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      router.push("/dashboard", { scroll: false });
    } else {
      router.push("/login", { scroll: false });
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      123
    </main>
  );
}
