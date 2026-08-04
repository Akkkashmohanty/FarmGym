"use client"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  useAdminUsers,
  useDeleteUser,
  useUpdateUserRole,
} from "@/features/admin/hooks/use-admin-users"

type UserRole =
  | "USER"
  | "FARMER"
  | "SELLER"
  | "CREATOR"
  | "ADMIN"

const ROLES: UserRole[] = [
  "USER",
  "FARMER",
  "SELLER",
  "CREATOR",
  "ADMIN",
]

export default function UsersTable() {
  const {
    data: users = [],
    isLoading,
  } = useAdminUsers()

  const updateRole =
    useUpdateUserRole()

  const deleteUser =
    useDeleteUser()

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card p-6">
        Loading users...
      </div>
    )
  }

  return (
    <div className="rounded-3xl border bg-card p-6">
      <h2 className="mb-6 text-2xl font-bold">
        User Management
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">
                Name
              </th>

              <th className="py-3 text-left">
                Email
              </th>

              <th className="py-3 text-left">
                Role
              </th>

              <th className="py-3 text-left">
                XP
              </th>

              <th className="py-3 text-left">
                Level
              </th>

              <th className="py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b"
              >
                <td className="py-4">
                  {user.full_name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  <select
                    className="rounded-lg border px-3 py-2"
                    value={user.role}
                    onChange={(e) =>
                      updateRole.mutate({
                        userId: user.id,
                        payload: {
                          role: e.target
                            .value as UserRole,
                        },
                      })
                    }
                  >
                    {ROLES.map((role) => (
                      <option
                        key={role}
                        value={role}
                      >
                        {role}
                      </option>
                    ))}
                  </select>
                </td>

                <td>{user.xp_points}</td>

                <td>{user.level}</td>

                <td className="text-right">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() =>
                      deleteUser.mutate(
                        user.id,
                      )
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}