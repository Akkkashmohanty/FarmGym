export interface Video {
  id: number

  creator_id: number

  title: string
  description: string

  video_url: string
  thumbnail_url?: string | null

  category?: string | null

  duration_seconds: number

  views: number
  likes_count: number
  comments_count: number

  is_published: boolean

  created_at: string
  updated_at: string
}