"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { adminApi } from "../api/admin.api"

export function useAnnouncements() {
  return useQuery({
    queryKey: ["admin", "announcements"],
    queryFn: adminApi.getAnnouncements,
  })
}

export function useReports() {
  return useQuery({
    queryKey: ["admin", "reports"],
    queryFn: adminApi.getReports,
  })
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: adminApi.createAnnouncement,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "announcements"],
      })
    },
  })
}

export function useCreateReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: adminApi.createReport,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "reports"],
      })
    },
  })
}

export function useResolveReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: adminApi.resolveReport,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "reports"],
      })
    },
  })
}