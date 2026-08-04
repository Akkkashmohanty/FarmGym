"use client"

import { useAnnouncements } from "@/features/admin/hooks/use-admin"

export default function AnnouncementList() {
  const {
    data: announcements = [],
    isLoading,
  } = useAnnouncements()

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card p-6">
        Loading announcements...
      </div>
    )
  }

  return (
    <div className="rounded-3xl border bg-card p-6">
      <h2 className="mb-6 text-2xl font-bold">
        Announcements
      </h2>

      {announcements.length === 0 ? (
        <p className="text-muted-foreground">
          No announcements available.
        </p>
      ) : (
        <div className="space-y-4">
          {announcements.map(
            (announcement) => (
              <div
                key={announcement.id}
                className="rounded-2xl border p-4"
              >
                <h3 className="text-lg font-semibold">
                  {announcement.title}
                </h3>

                <p className="mt-2 whitespace-pre-wrap text-muted-foreground">
                  {announcement.message}
                </p>

                <p className="mt-3 text-xs text-muted-foreground">
                  {new Date(
                    announcement.created_at,
                  ).toLocaleString()}
                </p>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  )
}