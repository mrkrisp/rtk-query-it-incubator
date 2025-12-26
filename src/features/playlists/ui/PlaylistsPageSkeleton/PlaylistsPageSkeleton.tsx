import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PlaylistListSkeleton from '@/features/playlists/ui/PlaylistList/PlaylistListSkeleton/PlaylistListSkeleton.tsx'
import CreatePlaylistFormSkeleton from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistFormSkeleton/CreatePlaylistFormSkeleton.tsx'

const PlaylistsPageSkeleton = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Skeleton style={{ width: '200px', height: '48px', margin: '20px 0' }} />

      {/*CreatePlaylistForm*/}
      <CreatePlaylistFormSkeleton />

      {/*<input type="search" placeholder={'Search playlist by title'} onChange={searchPlaylistHandler} />*/}
      <Skeleton width={'1186px'} height={'21px'} />

      {/*<PlaylistList playlists={data?.data || []} isPlaylistsLoading={isLoading} />*/}
      <PlaylistListSkeleton items={2} />

      {/*<Pagination*/}
      {/*  currentPage={currentPage}*/}
      {/*  setCurrentPage={setCurrentPage}*/}
      {/*  pagesCount={data?.meta.pagesCount || 1}*/}
      {/*  pageSize={pageSize}*/}
      {/*  changePageSize={changePageSizeHandler}*/}
      {/*/>*/}
    </div>
  )
}

export default PlaylistsPageSkeleton
