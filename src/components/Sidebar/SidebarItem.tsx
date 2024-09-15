"use client";

interface SidebarItemProps {
  label: string;
}

export const SidebarItem = ({ label }: SidebarItemProps) => {
  return <div>{label}</div>;
};
