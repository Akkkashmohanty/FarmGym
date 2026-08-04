import Image from "next/image"
import Link from "next/link"

import { Video } from "@/features/learning/types/video.types"

interface Props {
  video: Video
}

export default function VideoCard({
  video,
}: Props) {
  return (
    <Link
      href={`/learning/${video.id}`}
      className="group"
    >
      <div className="overflow-hidden rounded-3xl border bg-card">
        <div className="relative aspect-video bg-muted">
          {video.thumbnail_url ? (
            <Image
              src={video.thumbnail_url}
              alt={video.title}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No Thumbnail
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-semibold">
            {video.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {video.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>{video.views} views</span>

            <span>{video.likes_count} likes</span>

            <span>{video.comments_count} comments</span>
          </div>
        </div>
      </div>
    </Link>
  )
}