import { notFound } from "next/navigation"

import VideoPlayer from "@/components/learning/player/video-player"
import VideoActions from "@/components/learning/player/video-actions"
import CommentsSection from "@/components/learning/comments/comments-section"
import VideoCard from "@/features/learning/cards/video-card"

import { videoApi } from "@/features/learning/api/video.api"

interface Props {
  params: Promise<{
    videoId: string
  }>
}

export default async function VideoPage({
  params,
}: Props) {
  const { videoId } = await params

  const id = Number(videoId)

  if (Number.isNaN(id)) {
    notFound()
  }

  const [video, videos] = await Promise.all([
    videoApi.getVideo(id),
    videoApi.getVideos(),
  ])

  if (!video) {
    notFound()
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <VideoPlayer url={video.video_url} />

          <h1 className="mt-6 text-3xl font-bold">
            {video.title}
          </h1>

          <VideoActions />

          <div className="mt-10">
            <CommentsSection />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">
            Recommended Videos
          </h3>

          {videos
            .filter((item) => item.id !== video.id)
            .map((item) => (
              <VideoCard
                key={item.id}
                video={item}
              />
            ))}
        </div>
      </div>
    </main>
  )
}