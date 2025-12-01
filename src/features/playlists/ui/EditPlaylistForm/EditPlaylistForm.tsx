import type {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form"
import type { UpdatePlaylistArgs } from "@/features/playlists/api/playlistsApi.types.ts"
import { useUpdatePlaylistMutation } from "@/features/playlists/api/playlistsApi.ts"

type Props = {
  playlistId: string
  setPlaylistId: (id: null) => void
  register: UseFormRegister<UpdatePlaylistArgs>
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
  editPlaylistHandler: (playlist: null) => void
}

export const EditPlaylistForm = ({
  playlistId,
  setPlaylistId,
  register,
  handleSubmit,
  editPlaylistHandler,
}: Props) => {
  const [updatePlaylist] = useUpdatePlaylistMutation()

  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = data => {
    if (!playlistId) return
    updatePlaylist({ playlistId, body: data }).then(() => {
      setPlaylistId(null)
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register("title")} placeholder="title" />
      </div>
      <div>
        <input {...register("description")} placeholder="description" />
      </div>
      <button type={"submit"}>save</button>
      <button onClick={() => editPlaylistHandler(null)}>cancel</button>
    </form>
  )
}
