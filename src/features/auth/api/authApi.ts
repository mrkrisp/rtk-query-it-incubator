import { baseApi } from '@/app/api/baseApi.ts'
import type { meResponse, LoginArgs, LoginResponse } from '@/features/auth/api/authApi.types.ts'
import { AUTH_KEYS } from '@/common/constants'
import { loginResponseSchema, meResponseSchema } from '@/features/auth/model/auth.schemas.ts'
import { withZodCatch } from '@/common/utils/withZodCatch.ts'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<meResponse, void>({
      query: () => `auth/me`,
      ...withZodCatch(meResponseSchema),
      providesTags: ['Auth'],
    }),
    login: build.mutation<LoginResponse, LoginArgs>({
      query: (payload) => {
        return {
          url: `auth/login`,
          method: 'post',
          body: { ...payload, accessTokenTTL: '10s' },
        }
      },
      ...withZodCatch(loginResponseSchema),
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
