"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { LogOut } from "lucide-react"

import { useAuthStore } from "@/store/auth.store"
import { UserRole } from "@/types/auth.types"
import { getNavigationByRole } from "@/lib/navigation/navigation"

export default function DashboardSidebar() {
  const pathname = usePathname()

  const {
    user,
    role,
    logout,
  } = useAuthStore()

  const navigation = getNavigationByRole(
    (role ?? "USER") as UserRole,
  )

  const platformItems = navigation.filter(
    (item) => item.section === "platform",
  )

  const dashboardItems = navigation.filter(
    (item) => item.section === "dashboard",
  )

  const systemItems = navigation.filter(
    (item) => item.section === "system",
  )

  return (
    <aside className="hidden h-screen w-72 border-r border-white/10 bg-[#020817]/95 backdrop-blur-xl lg:block">
      <div className="flex h-full flex-col p-6">

        <div>
          <h2 className="text-3xl font-black text-white">
            Farm
            <span className="text-emerald-400">
              Gym
            </span>
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Smart Urban Farming
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-gray-400">
            Logged in as
          </p>

          <h3 className="mt-1 font-semibold text-white">
            {user?.full_name ?? "Guest"}
          </h3>

          <span className="mt-2 inline-flex rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
            {role ?? "USER"}
          </span>
        </div>

        <nav className="mt-8 flex-1 overflow-y-auto">

          <p className="mb-3 px-3 text-xs uppercase tracking-widest text-gray-500">
            Platform
          </p>

          <div className="space-y-2">
            {platformItems.map((item) => {
              const Icon = item.icon

              const active =
                pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${active
                    ? "border border-emerald-500/20 bg-emerald-500/15 text-emerald-300"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          <p className="mt-8 mb-3 px-3 text-xs uppercase tracking-widest text-gray-500">
            Dashboard
          </p>

          <div className="space-y-2">
            {dashboardItems.map((item) => {
              const Icon = item.icon

              const active =
                pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${active
                    ? "border border-emerald-500/20 bg-emerald-500/15 text-emerald-300"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {systemItems.length > 0 && (
            <>
              <p className="mt-8 mb-3 px-3 text-xs uppercase tracking-widest text-gray-500">
                System
              </p>

              <div className="space-y-2">
                {systemItems.map((item) => {
                  const Icon = item.icon

                  const active =
                    pathname === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${active
                        ? "border border-emerald-500/20 bg-emerald-500/15 text-emerald-300"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </>
          )}
        </nav>

        <button
          onClick={logout}
          className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>

      </div>
    </aside>
  )
}