"use client"

import Link from "next/link"
import Image from "next/image"

import {
  Play,
  Eye,
  ThumbsUp,
} from "lucide-react"

import { Video } from "@/features/learning/types/video.types"

interface Props {
  video: Video
}

export default function VideoCard({
  video,
}: Props) {
  return (
    <Link
      href={`/learn/${video.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {video.thumbnail_url ? (
          <Image
            src={video.thumbnail_url}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No Thumbnail
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600/90 text-white shadow-md">
            <Play className="h-5 w-5 fill-white pl-0.5" />
          </span>
        </div>

        {video.category && (
          <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase text-white backdrop-blur-md">
            {video.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h4 className="text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-green-600">
            {video.title}
          </h4>

          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
            {video.description}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-3.5">
          <span className="text-xs text-muted-foreground">
            Creator #{video.creator_id}
          </span>

          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {video.views}
            </span>

            <span className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              {video.likes_count}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}