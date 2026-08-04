"use client"

import {
  FileWarning,
  Megaphone,
} from "lucide-react"

import {
  useAnnouncements,
  useReports,
} from "@/features/admin/hooks/use-admin"

export default function AdminStats() {
  const { data: announcements = [] } =
    useAnnouncements()

  const { data: reports = [] } =
    useReports()

  const openReports = reports.filter(
    (report) => report.status === "OPEN",
  ).length

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Announcements
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {announcements.length}
            </h2>
          </div>

          <Megaphone className="h-10 w-10 text-green-600" />
        </div>
      </div>

      <div className="rounded-3xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Open Reports
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {openReports}
            </h2>
          </div>

          <FileWarning className="h-10 w-10 text-red-500" />
        </div>
      </div>
    </div>
  )
}   