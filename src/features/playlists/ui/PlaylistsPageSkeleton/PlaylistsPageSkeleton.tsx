import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PlaylistListSkeleton from '@/features/playlists/ui/PlaylistList/PlaylistListSkeleton/PlaylistListSkeleton.tsx'

const PlaylistsPageSkeleton = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Skeleton style={{ width: '200px', height: '48px', margin: '20px 0' }} />

      <Skeleton width={'1186px'} height={'21px'} />

      <PlaylistListSkeleton items={2} />
    </div>
  )
}

export default PlaylistsPageSkeleton
