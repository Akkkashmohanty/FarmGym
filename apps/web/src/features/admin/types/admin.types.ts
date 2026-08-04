export interface AdminAnnouncement {
  id: number
  admin_id: number
  title: string
  message: string
  created_at: string
}

export interface AdminReport {
  id: number
  reporter_id: number
  report_type: string
  target_id: number
  reason: string
  status: string
  created_at: string
}

export interface CreateAnnouncementRequest {
  title: string
  message: string
}

export interface CreateReportRequest {
  report_type: string
  target_id: number
  reason: string
}

export interface AdminUser {
  id: number
  full_name: string
  email: string
  role: string

  xp_points: number
  level: number
  streak_days: number

  created_at: string
}

export interface UpdateUserRoleRequest {
  role:
    | "USER"
    | "FARMER"
    | "SELLER"
    | "CREATOR"
    | "ADMIN"
}