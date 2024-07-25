import React, { forwardRef } from 'react'
import { usePagination } from 'react-use-pagination'
import { ChevronLeftIcon, ChevronRightIcon, DeleteIcon } from './Icons'
import { IUrl } from '~/models/Url'
import ClipboardButton from './Clipboard'

interface HistoryProps {
  history: IUrl[]
  setHistory: React.Dispatch<React.SetStateAction<IUrl[]>>
}

const History = ({ history, setHistory }: HistoryProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const {
    currentPage,
    totalPages,
    setNextPage,
    setPreviousPage,
    nextEnabled,
    previousEnabled,
    startIndex,
    endIndex
  } = usePagination({
    initialPageSize: 20,
    totalItems: history.length
  })

  const currentItems = history.slice(
    startIndex,
    endIndex + 1
  )

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  const onClick = (slug: string) => {
    window.open(window.location.href + slug, '_blank')
  }

  const onMouseEnter = (e: React.MouseEvent<HTMLInputElement>, slug: string) => {
    e.currentTarget.value = window.location.href + slug
  }

  const onMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = ''
  }

  const clearHistory = () => {
    const isConfirm = confirm('Are you sure you want to clear the history?')
    if (isConfirm) {
      setHistory([])
      window.localStorage.removeItem('history')
    }
  }

  const deleteUrl = (slug: string) => {
    const isConfirm = confirm('Are you sure want to delete?')
    if (isConfirm) {
      const newHistory = history.filter((url) => url.slug !== slug)
      setHistory(newHistory)
      window.localStorage.setItem('history', JSON.stringify(newHistory))
    }
  }

  return (
    <div className="history-container" ref={ref}>
      <div className="history-links scroll-shadow">
        {currentItems.map(({ url, slug }, key) => (
          <div key={key} className="input-form">
            <img
              src={`https://icons.duckduckgo.com/ip3/${new URL(url).hostname}.ico`}
              alt={url}
            />
            <input
              type="text"
              placeholder={url}
              onKeyDown={onKeyPress}
              onClick={() => onClick(slug)}
              onMouseEnter={e => onMouseEnter(e, slug)}
              onMouseLeave={onMouseLeave}
              className="border-reverse pointer"
            />
            <button
              className="border-reverse radius-reset"
              onClick={() => deleteUrl(slug)}
            >
              <DeleteIcon />
            </button>
            <ClipboardButton
              className="border-reverse"
              text={window.location.href + slug}
            />
          </div>
        ))}
      </div>
      <div className="history-controls">
        <div className="pagination input-form">
          <button
            className="button-border-full border-reverse"
            onClick={setPreviousPage}
            disabled={!previousEnabled}
          >
            <ChevronLeftIcon />
          </button>
          <button className="button-border-full border-reverse">
            {currentPage + 1} / {totalPages}
          </button>
          <button
            className="button-border-full border-reverse"
            onClick={setNextPage}
            disabled={!nextEnabled}
          >
            <ChevronRightIcon />
          </button>
        </div>
        <div className="input-form">
          <button
            onClick={clearHistory}
            className="button-border-full border-reverse"
          >
            Clear History
          </button>
        </div>
      </div>
    </div>
  )
}

export default forwardRef<HTMLDivElement, HistoryProps>(History)