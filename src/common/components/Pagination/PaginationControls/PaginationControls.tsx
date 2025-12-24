import { getPaginationPages } from '@/common/utils/getPaginationPages.ts'
import s from './PaginationControls.module.css'

type Props = {
  currentPage: number
  pagesCount: number
  setCurrentPage: (currentPage: number) => void
}

const PaginationControls = ({ currentPage, pagesCount, setCurrentPage }: Props) => {
  const pages = getPaginationPages(currentPage, pagesCount)

  return (
    <div className={s.pagination}>
      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className={s.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={page === currentPage ? `${s.pageButtonActive} ${s.pageButton}` : s.pageButton}
            onClick={() => page !== currentPage && setCurrentPage(Number(page))}
            disabled={page === currentPage}
            type="button"
          >
            {page}
          </button>
        ),
      )}
    </div>
  )
}

export default PaginationControls
