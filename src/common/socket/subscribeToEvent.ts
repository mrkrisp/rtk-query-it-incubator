import type { SocketEvents } from '@/common/constants'
import { getSocket } from '@/common/socket/getSocket.ts'

type Callback<T> = (data: T) => void

export const subscribeToEvent = <T>(event: SocketEvents, callback: Callback<T>) => {
  const socket = getSocket()
  socket.on(event, callback)

  return () => {
    socket.off(event, callback)
  }
}
