import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/app/api/baseQueryWithReauth.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Playlist', 'Auth'],
  keepUnusedDataFor: 120,
  refetchOnReconnect: true,
  endpoints: () => ({}),
  baseQuery: baseQueryWithReauth,
})
