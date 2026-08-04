"use client"

import { Button } from "@/components/ui/button"

import {
  useReports,
  useResolveReport,
} from "@/features/admin/hooks/use-admin"

export default function ReportsTable() {
  const {
    data: reports = [],
    isLoading,
  } = useReports()

  const resolve =
    useResolveReport()

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card p-6">
        Loading reports...
      </div>
    )
  }

  return (
    <div className="rounded-3xl border bg-card p-6">
      <h2 className="mb-6 text-2xl font-bold">
        User Reports
      </h2>

      {reports.length === 0 ? (
        <p className="text-muted-foreground">
          No reports found.
        </p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex flex-col gap-4 rounded-2xl border p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {report.report_type}
                  </span>

                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      report.status ===
                      "RESOLVED"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {report.reason}
                </p>

                <p className="text-xs text-muted-foreground">
                  Target ID: {report.target_id}
                </p>

                <p className="text-xs text-muted-foreground">
                  {new Date(
                    report.created_at,
                  ).toLocaleString()}
                </p>
              </div>

              {report.status !==
                "RESOLVED" && (
                <Button
                  onClick={() =>
                    resolve.mutate(
                      report.id,
                    )
                  }
                  disabled={
                    resolve.isPending
                  }
                >
                  Resolve
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}