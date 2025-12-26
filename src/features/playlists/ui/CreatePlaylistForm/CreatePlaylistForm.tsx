import { type SubmitHandler, useForm } from 'react-hook-form'
import type { CreatePlaylistsArgs } from '@/features/playlists/api/playlistsApi.types.ts'
import { useCreatePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts'

type Props = {
  setCurrentPage: (currentPage: number) => void
}

const CreatePlaylistForm = ({ setCurrentPage }: Props) => {
  const { register, handleSubmit, reset } = useForm<CreatePlaylistsArgs>()
  const [createPlaylist] = useCreatePlaylistMutation()

  const onSubmit: SubmitHandler<CreatePlaylistsArgs> = (data) => {
    createPlaylist(data)
      .unwrap()
      .then(() => {
        reset()
        setCurrentPage(1)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input {...register('title')} placeholder="title" />
      </div>
      <div>
        <input {...register('description')} placeholder="description" />
      </div>
      <button>create playlist</button>
    </form>
  )
}

export default CreatePlaylistForm
