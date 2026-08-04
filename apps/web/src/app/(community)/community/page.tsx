"use client"

import CommunityFeed from "@/components/community/feed/community-feed"

import ChallengeCard from "@/components/community/challenges/challenge-card"

import LeaderboardTable from "@/components/community/leaderboard/leaderboard-table"

import AchievementBadges from "@/components/community/badges/achievement-badges"

import PhotoUpload from "@/components/community/uploads/photo-upload"

import { useChallenges } from "@/features/community/hooks/use-community"

export default function CommunityPage() {
  const {
    data: challenges,
    isLoading,
  } = useChallenges()

  return (
    <main className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold">
          Community Platform
        </h1>

        <div className="mt-10 grid gap-8 xl:grid-cols-3">
          <div className="space-y-8 xl:col-span-2">
            <CommunityFeed />
          </div>

          <div className="space-y-8">
            {!isLoading &&
              challenges?.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                />
              ))}

            <LeaderboardTable />

            <AchievementBadges />

            <PhotoUpload />
          </div>
        </div>
      </div>
    </main>
  )
}