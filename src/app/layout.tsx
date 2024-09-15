import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "next-dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} text-stone-950 bg-stone-100 grid gap-4 p-4 grid-cols-[220px,_1fr]`}
      >
        <Sidebar />

        <div className="flex flex-col bg-white">
          <Navbar />

          {children}
        </div>
      </body>
    </html>
  );
}
