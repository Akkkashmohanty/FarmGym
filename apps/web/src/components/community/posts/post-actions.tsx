"use client"

import { useState } from "react"

import Image from "next/image"

import {
  Heart,
  MessageCircle,
} from "lucide-react"

import {
  useLikePost,
  useUnlikePost,
} from "@/features/community/hooks/use-community"

import { CommunityPost } from "@/features/community/types/community.types"

import { useAuthStore } from "@/store/auth.store"

import CommentsDialog from "../comments/comments-dialog"
import PostActions from "./post-actions"

interface Props {
  post: CommunityPost
}

export default function PostCard({
  post,
}: Props) {
  const [commentsOpen, setCommentsOpen] =
    useState(false)

  const like = useLikePost()
  const unlike = useUnlikePost()

  const user = useAuthStore(
    (state) => state.user,
  )

  const isOwner =
    user?.id === post.user_id

  async function handleLike() {
    if (post.is_liked) {
      await unlike.mutateAsync(post.id)
    } else {
      await like.mutateAsync(post.id)
    }
  }

  return (
    <div className="rounded-3xl border bg-card p-6">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-muted" />

          <div>
            <h3 className="font-semibold">
              {post.user.full_name}
            </h3>

            <p className="text-sm text-muted-foreground">
              {new Date(
                post.created_at,
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        {isOwner && (
          <PostActions post={post} />
        )}

      </div>

      <h4 className="mt-5 text-xl font-semibold">
        {post.title}
      </h4>

      <p className="mt-3 whitespace-pre-wrap">
        {post.description}
      </p>

      {post.image_url && (
        <div className="relative mt-5 aspect-video overflow-hidden rounded-3xl">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-6 flex items-center gap-6">

        <button
          onClick={handleLike}
          disabled={
            like.isPending ||
            unlike.isPending
          }
          className="flex items-center gap-2"
        >
          <Heart
            className={`h-5 w-5 ${
              post.is_liked
                ? "fill-red-500 text-red-500"
                : ""
            }`}
          />

          {post.likes_count}
        </button>

        <button
          onClick={() =>
            setCommentsOpen(true)
          }
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-5 w-5" />

          {post.comments_count}
        </button>

      </div>

      <CommentsDialog
        postId={post.id}
        open={commentsOpen}
        onOpenChange={setCommentsOpen}
      />

    </div>
  )
}