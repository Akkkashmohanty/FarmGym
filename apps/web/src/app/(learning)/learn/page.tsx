"use client"

import VideoCard from "@/components/learning/cards/video-card"
import VideoFilters from "@/components/learning/filters/video-filters"

import { useVideos } from "@/features/learning/hooks/use-videos"

export default function LearnPage() {
  const {
    data: videos,
    isLoading,
  } = useVideos()

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold">
          Farmer Learning Platform
        </h1>

        <p className="mt-3 text-muted-foreground">
          Learn farming from experts across India.
        </p>

        <div className="mt-8">
          <VideoFilters />
        </div>

        {isLoading ? (
          <div className="mt-10 text-muted-foreground">
            Loading...
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {videos?.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}