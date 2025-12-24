import { baseApi } from '@/app/api/baseApi.ts'
import type { GetMeOutput } from '@/features/auth/api/authApi.types.ts'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<GetMeOutput, void>({
      query: () => `auth/me`,
    }),
  }),
})

export const { useGetMeQuery } = authApi
