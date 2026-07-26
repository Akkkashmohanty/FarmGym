"use client"

import { useState } from "react"
import { Play, RotateCcw, Volume2, Maximize, Sprout } from "lucide-react"

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress] = useState(35) // Mock initial progress

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-black aspect-video shadow-lg group">
      {/* Video Content Render - Mock or Iframe */}
      {isPlaying ? (
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
          title="Video Player"
          className="w-full h-full border-0 absolute inset-0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center flex items-center justify-center cursor-pointer transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735')",
          }}
          onClick={togglePlay}
        >
          {/* Overlay Dark */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors" />

          {/* Sparkle Watermark logo */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white text-xs font-semibold">
            <Sprout className="h-4 w-4 text-green-500 animate-pulse" />
            <span>FarmGym Academy</span>
          </div>

          {/* Central Play Button */}
          <button className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-green-600/90 text-white shadow-xl backdrop-blur-sm transition hover:scale-110 hover:bg-green-700">
            <Play className="h-9 w-9 fill-white pl-1" />
          </button>
        </div>
      )}

      {/* Control Overlay (Only visible when hovering / playing iframe mock controls) */}
      {!isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer mb-3">
            <div className="h-full bg-green-600 rounded-full" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="hover:text-green-500 transition">
                <Play className="h-4.5 w-4.5" />
              </button>
              <button className="hover:text-green-500 transition">
                <RotateCcw className="h-4.5 w-4.5" />
              </button>
              <span className="font-mono">03:42 / 10:15</span>
            </div>

            <div className="flex items-center gap-4">
              <Volume2 className="h-4.5 w-4.5 hover:text-green-500 cursor-pointer" />
              <Maximize className="h-4.5 w-4.5 hover:text-green-500 cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}