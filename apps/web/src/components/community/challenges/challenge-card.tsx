interface Challenge {
  title: string
  participants: number
}

interface Props {
  challenge: Challenge
}

export default function ChallengeCard({
  challenge,
}: Props) {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-bold">
        {challenge.title}
      </h3>

      <p className="mt-4 text-muted-foreground">
        {challenge.participants} participants
      </p>

      <button className="mt-6 rounded-2xl bg-green-600 px-6 py-3 text-white">
        Join Challenge
      </button>
    </div>
  )
}