"use client"

import Image from "next/image"

import {
  Heart,
  MessageCircle,
} from "lucide-react"

interface Post {
  author: string
  content: string
  image?: string | null
  likes: number
  comments: number
}

interface Props {
  post: Post
}

export default function PostCard({
  post,
}: Props) {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-muted" />

        <div>
          <h3 className="font-semibold">
            {post.author}
          </h3>
        </div>
      </div>

      <p className="mt-5 text-lg">
        {post.content}
      </p>

      {post.image && (
        <div className="relative mt-5 aspect-video overflow-hidden rounded-3xl">
          <Image
            src={post.image}
            alt={post.author}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-6 flex items-center gap-6">
        <button className="flex items-center gap-2">
          <Heart className="h-5 w-5" />

          {post.likes}
        </button>

        <button className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />

          {post.comments}
        </button>
      </div>
    </div>
  )
}