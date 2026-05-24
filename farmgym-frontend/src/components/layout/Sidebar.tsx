"use client";

import Link from "next/link";

export default function Sidebar() {

  return (

    <div className="w-64 bg-black text-white h-screen p-5 fixed">

      <h1 className="text-3xl font-bold mb-10">
        FarmGym
      </h1>

      <div className="flex flex-col gap-4">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/onboarding">
          Onboarding
        </Link>

        <Link href="/profile">
          Profile
        </Link>

        <Link href="/marketplace">
          Marketplace
        </Link>

        <Link href="/videos">
          Videos
        </Link>

        <Link href="/planner">
          AI Planner
        </Link>

      </div>

    </div>
  );
}