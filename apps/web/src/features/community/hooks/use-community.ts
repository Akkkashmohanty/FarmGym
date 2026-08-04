"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { communityApi } from "../api/community.api"
import { CommunityPostCreate } from "../types/community.types"

export function usePosts(
  params?: {
    search?: string
    crop?: string
    state?: string
    page?: number
    limit?: number
  },
) {
  return useQuery({
    queryKey: ["community", "posts", params],
    queryFn: () => communityApi.getPosts(params),
  })
}

export function useChallenges() {
  return useQuery({
    queryKey: ["community", "challenges"],
    queryFn: communityApi.getChallenges,
  })
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ["community", "leaderboard"],
    queryFn: communityApi.getLeaderboard,
  })
}

export function useComments(postId: number) {
  return useQuery({
    queryKey: ["community", "comments", postId],
    queryFn: () => communityApi.getComments(postId),
    enabled: !!postId,
  })
}

export function useAddComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      postId,
      content,
    }: {
      postId: number
      content: string
    }) =>
      communityApi.addComment(postId, content),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["community", "comments", variables.postId],
      })

      queryClient.invalidateQueries({
        queryKey: ["community", "posts"],
      })
    },
  })
}

export function useDeleteComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      commentId,
      postId,
    }: {
      commentId: number
      postId: number
    }) =>
      communityApi.deleteComment(
        commentId,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "community",
          "comments",
          variables.postId,
        ],
      })

      queryClient.invalidateQueries({
        queryKey: [
          "community",
          "posts",
        ],
      })
    },
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: communityApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community", "posts"],
      })
    },
  })
}

export function useLikePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: communityApi.likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community", "posts"],
      })
    },
  })
}

export function useUnlikePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: communityApi.unlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community", "posts"],
      })
    },
  })
}

export function useJoinChallenge() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: communityApi.joinChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community", "challenges"],
      })
    },
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number
      payload: CommunityPostCreate
    }) =>
      communityApi.updatePost(
        id,
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community", "posts"],
      })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: communityApi.deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community", "posts"],
      })
    },
  })
}


