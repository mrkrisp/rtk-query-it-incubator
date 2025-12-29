import { baseApi } from '@/app/api/baseApi.ts'
import type { GetMeOutput, LoginArgs, LoginResponse } from '@/features/auth/api/authApi.types.ts'
import { AUTH_KEYS } from '@/common/constants'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<GetMeOutput, void>({
      query: () => `auth/me`,
      providesTags: ['Auth'],
    }),
    login: build.mutation<LoginResponse, LoginArgs>({
      query: (payload) => {
        return {
          url: `auth/login`,
          method: 'post',
          body: { ...payload, accessTokenTTL: '3m' },
        }
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        localStorage.setItem(AUTH_KEYS.accessToken, data.accessToken)
        localStorage.setItem(AUTH_KEYS.refreshToken, data.refreshToken)

        dispatch(authApi.util.invalidateTags(['Auth']))
      },
    }),
    logout: build.mutation<void, void>({
      query: () => {
        const refreshToken = localStorage.getItem(AUTH_KEYS.refreshToken)
        return {
          url: 'auth/logout',
          method: 'post',
          body: { refreshToken },
        }
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
        localStorage.removeItem(AUTH_KEYS.accessToken)
        localStorage.removeItem(AUTH_KEYS.refreshToken)
        dispatch(authApi.util.resetApiState())
      },
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi
