import { toast } from 'react-toastify'

export function succesToast(message: string) {
  toast(message, { type: 'success', theme: 'colored' })
}
