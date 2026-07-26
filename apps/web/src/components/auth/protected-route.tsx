"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuthStore } from "@/store/auth.store"
import { UserRole } from "@/types/auth.types"
import { hasPermission } from "@/lib/auth/permissions"

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: UserRole[]
  requiredPermission?: string
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  requiredPermission,
}: ProtectedRouteProps) {
  const router = useRouter()

  const {
    isAuthenticated,
    role,
  } = useAuthStore()

  const hydrated = useAuthStore.persist.hasHydrated()

  useEffect(() => {
    if (!hydrated) return

    if (!isAuthenticated) {
      router.replace("/login")
      return
    }

    if (
      allowedRoles &&
      role &&
      !allowedRoles.includes(role as UserRole)
    ) {
      router.replace("/dashboard")
      return
    }

    if (
      requiredPermission &&
      role &&
      !hasPermission(
        role as UserRole,
        requiredPermission,
      )
    ) {
      router.replace("/dashboard")
      return
    }
  }, [
    hydrated,
    isAuthenticated,
    role,
    allowedRoles,
    requiredPermission,
    router,
  ])

  if (!hydrated) {
    return null
  }

  if (!isAuthenticated) {
    return null
  }

  if (
    allowedRoles &&
    role &&
    !allowedRoles.includes(role as UserRole)
  ) {
    return null
  }

  if (
    requiredPermission &&
    role &&
    !hasPermission(
      role as UserRole,
      requiredPermission,
    )
  ) {
    return null
  }

  return <>{children}</>
}