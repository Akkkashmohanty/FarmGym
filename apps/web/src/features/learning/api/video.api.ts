import { api } from "@/lib/axios/client"

import { Video } from "../types/video.types"

export const videoApi = {
  async getVideos() {
    const response = await api.get<Video[]>("/videos")
    return response.data
  },

  async getVideo(videoId: number) {
    const response = await api.get<Video>(`/videos/${videoId}`)
    return response.data
  },
}