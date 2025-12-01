import type { Images, Tag, User } from "@/common/types/types.ts"
import type { CurrentUserReaction } from "@/common/enums/enums.ts"

export type PlaylistsResponse = {
  data: PlaylistData[]
  meta: PlaylistMeta
}

export type PlaylistMeta = {
  page: number
  pageSize: number
  totalCount: number
  pagesCount: number
}

export type PlaylistData = {
  id: string
  type: string
  attributes: PlaylistAttributes
}

export type PlaylistAttributes = {
  title: string
  description: string
  addedAt: string
  updatedAt: string
  order: number
  user: User
  images: Images
  tags: Tag[]
  likesCount: number
  dislikesCount: number
  currentUserReaction: CurrentUserReaction
}

// Arguments
export type FetchPlaylistsArgs = {
  pageNumber?: number
  pageSize?: number
  search?: string
  sortBy?: "addedAt" | "likesCount"
  sortDirection?: "asc" | "desc"
  tagsIds?: string[]
  userId?: string
  trackId?: string
}

export type CreatePlaylistsArgs = {
  title: string
  description: string
}

export type UpdatePlaylistArgs = {
  title: string
  description: string
  tagIds: string[]
}
