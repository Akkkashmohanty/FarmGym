"use client"

export default function Error({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h2 className="text-3xl font-bold">Something went wrong.</h2>

      <button
        onClick={reset}
        className="rounded-xl bg-green-600 px-6 py-3 text-white"
      >
        Try Again
      </button>
    </div>
  )
}