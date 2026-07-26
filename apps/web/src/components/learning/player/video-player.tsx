"use client"

import { useState } from "react"
import {
  Play,
  RotateCcw,
  Volume2,
  Maximize,
  Sprout,
} from "lucide-react"

interface VideoPlayerProps {
  url: string
}

export default function VideoPlayer({
  url,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress] = useState(35)

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  // Convert YouTube watch URLs to embed URLs if needed
  const embedUrl = url.includes("watch?v=")
    ? url.replace("watch?v=", "embed/")
    : url

  const autoplayUrl = `${embedUrl}${
    embedUrl.includes("?") ? "&" : "?"
  }autoplay=1&mute=1`

  return (
    <div className="group relative aspect-video overflow-hidden rounded-3xl border border-border bg-black shadow-lg">
      {isPlaying ? (
        <iframe
          src={autoplayUrl}
          title="Video Player"
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <div
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735')",
          }}
          onClick={togglePlay}
        >
          <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/55" />

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            <Sprout className="h-4 w-4 animate-pulse text-green-500" />
            <span>FarmGym Academy</span>
          </div>

          <button
            type="button"
            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-green-600/90 text-white shadow-xl backdrop-blur-sm transition hover:scale-110 hover:bg-green-700"
          >
            <Play className="h-9 w-9 fill-white pl-1" />
          </button>
        </div>
      )}

      {!isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <div className="mb-3 h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-green-600"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={togglePlay}
                className="transition hover:text-green-500"
              >
                <Play className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="transition hover:text-green-500"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              <span className="font-mono">03:42 / 10:15</span>
            </div>

            <div className="flex items-center gap-4">
              <Volume2 className="h-4 w-4 cursor-pointer hover:text-green-500" />
              <Maximize className="h-4 w-4 cursor-pointer hover:text-green-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}