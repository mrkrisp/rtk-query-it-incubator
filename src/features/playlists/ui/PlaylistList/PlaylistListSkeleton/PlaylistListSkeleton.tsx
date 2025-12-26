import Skeleton from 'react-loading-skeleton'
import s from './PlaylistListSkeleton.module.css'

type Props = {
  items: number
}

const PlaylistListSkeleton = ({ items }: Props) => {
  return (
    <div className={s.list}>
      {Array(items)
        .fill(0)
        .map((_, i) => (
          <div className={s.item} key={i}>
            <Skeleton style={{ width: '240px', height: '240px' }} />
            <Skeleton count={4} />
            <div className={s.buttons}>
              <Skeleton className={s.delete} width={'80px'} height={'21px'} />
              <Skeleton className={s.update} width={'80px'} height={'21px'} />
            </div>
          </div>
        ))}
    </div>
  )
}

export default PlaylistListSkeleton
