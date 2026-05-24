"use client";

import Sidebar from "./Sidebar";

import Navbar from "./Navbar";

import authStore from "@/store/authStore";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (

    <div className="flex">

      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-100">

        <Navbar
          onLogout={authStore.logout}
        />

        <div className="p-6">

          {children}

        </div>

      </div>

    </div>
  );
}