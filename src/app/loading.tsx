import React from "react";

export default function RootLoading() {
  return (
    <div className="flex flex-col justify-between h-screen ">
      <div className="flex-grow flex items-center justify-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        Loading...
      </div>
    </div>
  );
}
