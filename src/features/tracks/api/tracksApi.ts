import { baseApi } from '@/app/api/baseApi.ts'
import type { FetchTracksResponse } from '@/features/tracks/api/tracksApi.types.ts'

export const tracksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchTracks: build.infiniteQuery<FetchTracksResponse, void, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          return lastPageParam < (lastPage.meta as { pagesCount: number }).pagesCount ? lastPageParam + 1 : undefined
        },
      },
      query: ({ pageParam }) => ({
        url: `playlists/tracks`,
        params: { pageNumber: pageParam, paginationType: 'offset', pageSize: 10 },
      }),
    }),
  }),
})

export const { useFetchTracksInfiniteQuery } = tracksApi
