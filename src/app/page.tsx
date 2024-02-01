"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      redirect("/dashboard");
    } else {
      redirect("/login");
    }
  }, []);
}
