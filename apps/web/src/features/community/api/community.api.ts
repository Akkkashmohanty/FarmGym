import { api } from "@/lib/axios/client"

import {
  CommunityChallenge,
  CommunityComment,
  CommunityLeaderboardUser,
  CommunityPost,
  CommunityPostCreate,
} from "../types/community.types"

export interface CommunityPostQuery {
  search?: string
  crop?: string
  state?: string
  page?: number
  limit?: number
}

export const communityApi = {
  async getPosts(params?: CommunityPostQuery) {
    const response = await api.get<CommunityPost[]>(
      "/community/posts",
      {
        params,
      },
    )

    return response.data
  },

  async getPost(id: number) {
    const response = await api.get<CommunityPost>(
      `/community/posts/${id}`,
    )

    return response.data
  },

  async createPost(
    payload: CommunityPostCreate,
  ) {
    const formData = new FormData()

    formData.append("title", payload.title)
    formData.append("description", payload.description)

    if (payload.crop) {
      formData.append("crop", payload.crop)
    }

    if (payload.state) {
      formData.append("state", payload.state)
    }

    if (payload.tags) {
      formData.append("tags", payload.tags)
    }

    if (payload.challenge_id) {
      formData.append(
        "challenge_id",
        String(payload.challenge_id),
      )
    }

    if (payload.image) {
      formData.append("image", payload.image)
    }

    const response =
      await api.post<CommunityPost>(
        "/community/posts",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        },
      )

    return response.data
  },

  async updatePost(
    id: number,
    payload: CommunityPostCreate,
  ) {
    const formData = new FormData()

    formData.append("title", payload.title)
    formData.append("description", payload.description)

    if (payload.crop) {
      formData.append("crop", payload.crop)
    }

    if (payload.state) {
      formData.append("state", payload.state)
    }

    if (payload.tags) {
      formData.append("tags", payload.tags)
    }

    if (payload.challenge_id) {
      formData.append(
        "challenge_id",
        String(payload.challenge_id),
      )
    }

    if (payload.image) {
      formData.append("image", payload.image)
    }

    const response =
      await api.patch<CommunityPost>(
        `/community/posts/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        },
      )

    return response.data
  },

  async deletePost(id: number) {
    await api.delete(
      `/community/posts/${id}`,
    )
  },

  async likePost(id: number) {
    await api.post(
      `/community/posts/${id}/like`,
    )
  },

  async unlikePost(id: number) {
    await api.delete(
      `/community/posts/${id}/like`,
    )
  },

  async getComments(postId: number) {
    const response =
      await api.get<CommunityComment[]>(
        `/community/posts/${postId}/comments`,
      )

    return response.data
  },

  async addComment(
    postId: number,
    content: string,
  ) {
    const response =
      await api.post<CommunityComment>(
        `/community/posts/${postId}/comments`,
        {
          content,
        },
      )

    return response.data
  },

  async deleteComment(commentId: number) {
    await api.delete(
      `/community/comments/${commentId}`,
    )
  },

  async getChallenges() {
    const response =
      await api.get<CommunityChallenge[]>(
        "/community/challenges",
      )

    return response.data
  },

  async joinChallenge(id: number) {
    await api.post(
      `/community/challenges/${id}/join`,
    )
  },

  async getLeaderboard() {
    const response =
      await api.get<CommunityLeaderboardUser[]>(
        "/community/leaderboard",
      )

    return response.data
  },
}