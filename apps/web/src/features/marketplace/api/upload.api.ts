import { api } from "@/lib/axios/client"

export interface UploadResponse {
  image_url: string
}

export const uploadApi = {
  async uploadImage(file: File) {
    const formData = new FormData()

    formData.append("file", file)

    const response =
      await api.post<UploadResponse>(
        "/uploads/image",
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
}