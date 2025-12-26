import type { PlaylistAttributes } from '@/features/playlists/api/playlistsApi.types.ts'
import s from './PlaylistDescription.module.css'

type Props = {
  attributes: PlaylistAttributes
}

const PlaylistDescription = ({ attributes }: Props) => {
  return (
    <div>
      <div className={s['overflow-fix']}>title: {attributes.title}</div>
      <div className={s['overflow-fix']}>description: {attributes.description}</div>
      <div>username: {attributes.user.name}</div>
    </div>
  )
}

export default PlaylistDescription
