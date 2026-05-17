"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem(
      "token"
    );

    if (!token) {
      router.push("/login");
    }

  }, []);

  return (

    <div className="flex items-center justify-center h-screen">

      <h1 className="text-5xl font-bold">
        Dashboard
      </h1>

    </div>
  );
}