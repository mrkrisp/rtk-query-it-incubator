import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi.ts'
import s from './PlaylistsPage.module.css'
import CreatePlaylistForm from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm.tsx'
import { type ChangeEvent, useState } from 'react'
import { useDebounceValue } from '@/common/hooks/useDebounceValue.ts'
import { Pagination } from '@/common/components'
import PlaylistList from '@/features/playlists/ui/PlaylistList/PlaylistList.tsx'

export const PlaylistsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(2)

  const [search, setSearch] = useState<string>('')
  const debounceSearch = useDebounceValue(search)

  const { data, isLoading } = useFetchPlaylistsQuery(
    {
      search: debounceSearch,
      pageNumber: currentPage,
      pageSize,
    },
    {
      pollingInterval: 3000,
      skipPollingIfUnfocused: true,
    },
  )

  const changePageSizeHandler = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }
  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input type="search" placeholder={'Search playlist by title'} onChange={searchPlaylistHandler} />
      <PlaylistList playlists={data?.data || []} isPlaylistsLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  )
}
