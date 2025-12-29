import { baseQuery } from '@/app/api/baseQuery.ts'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { AUTH_KEYS } from '@/common/constants'
import { isToken } from '@/common/utils'
import { baseApi } from '@/app/api/baseApi.ts'
import { handleErrors } from '@/common/utils/handleErrors.ts'

const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000)) // delay
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshToken = localStorage.getItem(AUTH_KEYS.refreshToken)

        const refreshResult = await baseQuery(
          { url: '/auth/refresh', method: 'post', body: { refreshToken } },
          api,
          extraOptions,
        )

        if (refreshResult.data && isToken(refreshResult.data)) {
          localStorage.setItem(AUTH_KEYS.accessToken, refreshResult.data.accessToken)
          localStorage.setItem(AUTH_KEYS.refreshToken, refreshResult.data.refreshToken)

          result = await baseQuery(args, api, extraOptions)
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          api.dispatch(baseApi.endpoints.logout.initiate())
        }
      } finally {
        release()
      }
    } else {
      mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  if (result.error && result.error.status !== 401) {
    handleErrors(result.error)
  }

  return result
}
