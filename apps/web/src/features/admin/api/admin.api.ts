import { api } from "@/lib/axios/client"

import {
  AdminAnnouncement,
  AdminReport,
  CreateAnnouncementRequest,
  CreateReportRequest,
} from "../types/admin.types"

export const adminApi = {
  async getAnnouncements() {
    const response =
      await api.get<AdminAnnouncement[]>(
        "/admin/announcements",
      )

    return response.data
  },

  async createAnnouncement(
    payload: CreateAnnouncementRequest,
  ) {
    const response =
      await api.post<AdminAnnouncement>(
        "/admin/announcements",
        payload,
      )

    return response.data
  },

  async getReports() {
    const response =
      await api.get<AdminReport[]>(
        "/admin/reports",
      )

    return response.data
  },

  async createReport(
    payload: CreateReportRequest,
  ) {
    const response =
      await api.post<AdminReport>(
        "/admin/reports",
        payload,
      )

    return response.data
  },

  async resolveReport(
    reportId: number,
  ) {
    const response =
      await api.patch<AdminReport>(
        `/admin/reports/${reportId}/resolve`,
      )

    return response.data
  },
}