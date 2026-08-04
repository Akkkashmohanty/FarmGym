"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import CommunityFilters from "../filters/community-filters"
import PostCard from "../posts/post-card"

import { usePosts } from "@/features/community/hooks/use-community"

export default function CommunityFeed() {
  const [search, setSearch] = useState("")
  const [crop, setCrop] = useState("")
  const [state, setState] = useState("")
  const [page, setPage] = useState(1)

  const {
    data: posts,
    isLoading,
    isError,
  } = usePosts({
    search,
    crop,
    state,
    page,
    limit: 10,
  })

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card p-8">
        Loading community posts...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-red-500">
        Failed to load community posts.
      </div>
    )
  }

  return (
    <>
      <CommunityFilters
        search={search}
        crop={crop}
        state={state}
        onSearchChange={setSearch}
        onCropChange={setCrop}
        onStateChange={setState}
      />

      <div className="space-y-6">
        {posts?.length ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))
        ) : (
          <div className="rounded-3xl border bg-card p-8 text-center text-muted-foreground">
            No community posts found.
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={() =>
            setPage((p) => p + 1)
          }
        >
          Load More
        </Button>
      </div>
    </>
  )
}