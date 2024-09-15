"use client";
import { User } from "./User";

export const Navbar = () => {
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">🚀 Good morning, Tom!</span>
          <span className="text-xs block text-stone-500">
            Tuesday, Aug 8th 2023
          </span>
        </div>

        <User />
      </div>
    </div>
  );
};
