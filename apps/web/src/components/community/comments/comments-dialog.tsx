"use client"

import { useState } from "react"

import { Trash2 } from "lucide-react"

import { useAuthStore } from "@/store/auth.store"

import {
  useAddComment,
  useComments,
  useDeleteComment,
} from "@/features/community/hooks/use-community"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  postId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CommentsDialog({
  postId,
  open,
  onOpenChange,
}: Props) {
  const [content, setContent] =
    useState("")

  const {
    data: comments,
    isLoading,
    isError,
  } = useComments(postId)

  const user = useAuthStore(
    (state) => state.user,
  )

  const addComment =
    useAddComment()

  const deleteComment =
    useDeleteComment()

  async function handleDelete(
    commentId: number,
  ) {
    const confirmed =
      window.confirm(
        "Delete this comment?",
      )

    if (!confirmed) return

    await deleteComment.mutateAsync({
      commentId,
      postId,
    })
  }

  async function handleSubmit() {
    const value = content.trim()

    if (!value) return

    await addComment.mutateAsync({
      postId,
      content: value,
    })

    setContent("")
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Comments
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {isLoading && (
            <p className="text-sm text-muted-foreground">
              Loading comments...
            </p>
          )}

          {isError && (
            <p className="text-sm text-red-500">
              Failed to load comments.
            </p>
          )}

          {!isLoading &&
            comments?.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No comments yet.
              </p>
            )}

          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl border p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">
                    {comment.user.full_name}
                  </h4>

                  <span className="text-xs text-muted-foreground">
                    {new Date(
                      comment.created_at,
                    ).toLocaleDateString()}
                  </span>
                </div>

                {user?.id ===
                  comment.user_id && (
                  <button
                    onClick={() =>
                      handleDelete(
                        comment.id,
                      )
                    }
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <p className="mt-2 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-4">
          <Textarea
            rows={4}
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            placeholder="Write a comment..."
          />

          <Button
            onClick={handleSubmit}
            disabled={
              addComment.isPending ||
              !content.trim()
            }
            className="w-full"
          >
            {addComment.isPending
              ? "Posting..."
              : "Post Comment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}