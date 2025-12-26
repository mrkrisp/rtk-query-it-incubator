import Skeleton from 'react-loading-skeleton'
import s from './CreatePlaylistFormSkeleton.module.css'

const CreatePlaylistFormSkeleton = () => {
  return (
    <form>
      <Skeleton className={s.title} />
      <Skeleton className={s.input} />
      <Skeleton className={s.input} />
      <Skeleton className={s['create-button']} />
    </form>
  )
}

export default CreatePlaylistFormSkeleton
