"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { adminUserApi } from "../api/admin-user.api"

import { UpdateUserRoleRequest } from "../types/admin.types"

export function useAdminUsers() {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: adminUserApi.getUsers,
  })
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: number
      payload: UpdateUserRoleRequest
    }) =>
      adminUserApi.updateRole(
        userId,
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      userId: number,
    ) =>
      adminUserApi.deleteUser(
        userId,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      })
    },
  })
}