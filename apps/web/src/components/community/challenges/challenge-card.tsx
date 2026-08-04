"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { useJoinChallenge } from "@/features/community/hooks/use-community"
import { CommunityChallenge } from "@/features/community/types/community.types"

interface Props {
  challenge: CommunityChallenge
}

export default function ChallengeCard({
  challenge,
}: Props) {
  const joinChallenge =
    useJoinChallenge()

  async function handleJoin() {
    try {
      await joinChallenge.mutateAsync(
        challenge.id,
      )

      toast.success(
        "Challenge joined successfully!",
      )
    } catch (error) {
      console.error(error)

      toast.error(
        "Failed to join challenge.",
      )
    }
  }

  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-bold">
        {challenge.title}
      </h3>

      <p className="mt-2 text-muted-foreground">
        {challenge.description}
      </p>

      <p className="mt-4 text-sm text-muted-foreground">
        {challenge.participants} participants
      </p>

      <Button
        className="mt-6 w-full"
        onClick={handleJoin}
        disabled={joinChallenge.isPending}
      >
        {joinChallenge.isPending
          ? "Joining..."
          : "Join Challenge"}
      </Button>
    </div>
  )
}