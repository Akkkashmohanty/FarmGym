"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { decodeToken } from "@/lib/auth";

export default function useRoleRedirect() {

  const router = useRouter();

  useEffect(() => {

    const payload = decodeToken();

    if (!payload) {

      router.push("/login");

      return;
    }

    if (payload.status === "pending") {

      router.push("/waiting");

      return;
    }

    if (payload.status === "rejected") {

      router.push("/rejected");

      return;
    }

  }, []);
}