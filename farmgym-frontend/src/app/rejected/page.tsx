"use client";

import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function RejectedPage() {

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950 to-black p-6">

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 max-w-lg w-full text-center text-white shadow-2xl">

        <div className="flex justify-center mb-6">

          <div className="bg-red-500/20 p-5 rounded-full">

            <XCircle className="w-14 h-14 text-red-400" />

          </div>

        </div>

        <h1 className="text-4xl font-bold mb-4">
          Application Rejected
        </h1>

        <p className="text-gray-300 leading-7 text-lg">

          Unfortunately your onboarding request was not approved.
          Please contact support for further assistance.

        </p>

        <Button
          onClick={logout}
          className="mt-8 w-full h-12 text-lg rounded-xl"
        >
          Logout
        </Button>

      </div>

    </div>
  );
}