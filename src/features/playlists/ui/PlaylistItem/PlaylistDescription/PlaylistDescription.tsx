import type { PlaylistAttributes } from "@/features/playlists/api/playlistsApi.types.ts"

type Props = {
  attributes: PlaylistAttributes
}

const PlaylistDescription = ({ attributes }: Props) => {
  return (
    <div>
      <div>title: {attributes.title}</div>
      <div>description: {attributes.description}</div>
      <div>username: {attributes.user.name}</div>
    </div>
  )
}

export default PlaylistDescription
