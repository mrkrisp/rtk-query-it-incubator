import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { errorToast } from '@/common/utils/errorToast.ts'
import { isErrorWithProperty } from '@/common/utils/isErrorWithProperty.ts'
import { isErrorWithDetailArray } from '@/common/utils/isErrorWithDetailArray.ts'
import { trimToMaxLength } from '@/common/utils/trimToMaxLength.ts'

export function handleErrors(error: FetchBaseQueryError) {
  switch (error.status) {
    case 'FETCH_ERROR':
    case 'PARSING_ERROR':
    case 'CUSTOM_ERROR':
    case 'TIMEOUT_ERROR':
      errorToast(error.error)
      break

    case 404:
      if (isErrorWithProperty(error.data, 'error')) {
        errorToast(error.data.error)
      } else {
        errorToast(JSON.stringify(error.data))
      }

      break

    case 429:
      // ✅ 1. Type Assertions
      // toast((.error.data as { message: string }).message)
      // ✅ 2. JSON.stringify
      // toast(JSON.stringify(.error.data))
      // ✅ 3. Type Predicate
      if (isErrorWithProperty(error.data, 'message')) {
        errorToast(error.data.message)
      } else {
        errorToast(JSON.stringify(error.data))
      }
      break

    case 400:
    case 403:
      if (isErrorWithDetailArray(error.data)) {
        const errorMessage = error.data.errors[0].detail
        if (errorMessage.includes('refreshToken')) return
        errorToast(trimToMaxLength(error.data.errors[0].detail))
      } else {
        errorToast(JSON.stringify(error.data))
      }
      break

    default:
      if (error.status >= 500 && error.status < 600) {
        errorToast('Some error occurred. Please try again later.')
      } else {
        errorToast('Some error occurred')
      }
  }
}
