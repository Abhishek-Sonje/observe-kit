"use client";

import { UserButton } from "@clerk/nextjs";

export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4 display flex items-center justify-between">
          <h1 className="text-xl font-bold">Trace Explorer</h1>
          <div><UserButton /></div>
    </nav>
  );
}