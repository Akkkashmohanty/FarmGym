import { useMutation } from "@tanstack/react-query"

import { uploadApi } from "../api/upload.api"

export function useUploadImage() {
  return useMutation({
    mutationFn: uploadApi.uploadImage,
  })
}