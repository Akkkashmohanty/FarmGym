export interface CommunityUser {
  id: number
  full_name: string
}

export interface CommunityPost {
  id: number
  user_id: number
  title: string
  description: string
  image_url?: string | null
  state?: string | null
  crop?: string | null
  tags?: string | null
  challenge_id?: number | null
  likes_count: number
  comments_count: number
  is_liked: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  user: CommunityUser
}

export interface CommunityPostCreate {
  title: string
  description: string
  state?: string
  crop?: string
  tags?: string
  challenge_id?: number
  image?: File
}

export interface CommunityComment {
  id: number
  post_id: number
  user_id: number
  parent_id?: number | null
  content: string
  created_at: string
  updated_at: string
  user: CommunityUser
}

export interface CommunityChallenge {
  id: number
  title: string
  description: string
  banner_url?: string | null
  reward_badge?: string | null
  starts_at: string
  ends_at: string
  is_active: boolean
  participants: number
}

export interface CommunityLeaderboardUser {
  id: number
  full_name: string
  xp_points: number
  level: number
}