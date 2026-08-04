"use client"

import { useLeaderboard } from "@/features/community/hooks/use-community"

export default function LeaderboardTable() {
  const {
    data: leaderboard,
    isLoading,
    isError,
  } = useLeaderboard()

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card p-6">
        Loading leaderboard...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-red-500">
        Failed to load leaderboard.
      </div>
    )
  }

  return (
    <div className="rounded-3xl border bg-card p-6">
      <h2 className="text-3xl font-bold">
        Leaderboard
      </h2>

      <div className="mt-8 space-y-5">
        {leaderboard?.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-2xl bg-muted p-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold">
                #{index + 1}
              </span>

              <span>{user.full_name}</span>
            </div>

            <span className="font-semibold text-green-600">
              {user.xp_points} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}