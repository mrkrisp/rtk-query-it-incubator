import { useGetMeQuery } from '@/features/auth/api/authApi.ts'
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'
import PlaylistList from '@/features/playlists/ui/PlaylistList/PlaylistList.tsx'
import CreatePlaylistForm from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm.tsx'
import s from './ProfilePage.module.css'
import { Navigate } from 'react-router'
import { Path } from '@/common/routing'

export const ProfilePage = () => {
  const { data: meResponce, isLoading: isMeLoading } = useGetMeQuery()

  const { data: playlistsResponce, isLoading } = useFetchPlaylistsQuery(
    { userId: meResponce?.userId },
    { skip: !meResponce?.userId },
  )

  if (!isMeLoading && !meResponce) return <Navigate to={Path.Playlists} />

  if (isLoading || isMeLoading) return <h1>Skeleton loader...</h1>

  return (
    <div>
      <h1>{meResponce?.login} page</h1>
      <div className={s.container}>
        <CreatePlaylistForm />
        <PlaylistList playlists={playlistsResponce?.data || []} isPlaylistsLoading={isLoading || isMeLoading} />
      </div>
    </div>
  )
}
