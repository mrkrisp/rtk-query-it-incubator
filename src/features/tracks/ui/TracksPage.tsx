import { useFetchTracksInfiniteQuery } from '@/features/tracks/api/tracksApi.ts'
import { useInfiniteScroll } from '@/common/hooks/useInfiniteScroll.ts'
import TracksList from '@/features/tracks/ui/TracksList/TracksList.tsx'
import LoadingTrigger from '@/features/tracks/ui/LoadingTrigger/LoadingTrigger.tsx'

export const TracksPage = () => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useFetchTracksInfiniteQuery()

  const pages = data?.pages.flatMap((page) => page.data) || []

  const { observerRef } = useInfiniteScroll({ hasNextPage, isFetching, fetchNextPage })

  return (
    <div>
      <h1>Tracks page</h1>
      <TracksList tracks={pages} />
      {hasNextPage && <LoadingTrigger observerRef={observerRef} isFetchingNextPage={isFetchingNextPage} />}

      {!hasNextPage && pages.length > 0 && <div>Nothing more to load</div>}
    </div>
  )
}
