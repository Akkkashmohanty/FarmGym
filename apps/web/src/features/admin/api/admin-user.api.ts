import { api } from "@/lib/axios/client"

import {
  AdminUser,
  UpdateUserRoleRequest,
} from "../types/admin.types"

export const adminUserApi = {
  async getUsers() {
    const response =
      await api.get<AdminUser[]>(
        "/admin/users",
      )

    return response.data
  },

  async updateRole(
    userId: number,
    payload: UpdateUserRoleRequest,
  ) {
    const response =
      await api.patch<AdminUser>(
        `/admin/users/${userId}/role`,
        payload,
      )

    return response.data
  },

  async deleteUser(
    userId: number,
  ) {
    await api.delete(
      `/admin/users/${userId}`,
    )
  },
}