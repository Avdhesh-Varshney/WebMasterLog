import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IUrl } from '~/models/Url'
import isURL from '~/lib/valid-url'
import History from '~/components/History'
import Clipboard from '~/components/Clipboard'
import GithubCorner from '~/components/GithubCorner'
import { ArrowRightIcon, ChevronDownIcon, LoadingIcon } from '~/components/Icons'

interface ApiReponse extends Partial<IUrl> {
  ok: boolean
  message?: string
}

interface FormInputs {
  url: string
}

export default function Index() {
  const formRef = useRef<HTMLFormElement>()
  const historyRef = useRef<HTMLDivElement>()
  const [isHasCopy, setHasCopy] = useState(false)
  const [isHasLoading, setHasLoading] = useState(false)
  const [history, setHistory] = useState<IUrl[]>([])

  const {
    register,
    setFocus,
    setValue,
    getValues,
    handleSubmit
  } = useForm()

  useEffect(() => {
    const data = window.localStorage.getItem('history')
    data && setHistory(JSON.parse(data))

    formRef.current.addEventListener('animationend', () => {
      formRef.current.classList.remove('input-shake')
    })

    setFocus('url')
  }, [setFocus])

  const onSubmitForm = async ({ url }: FormInputs) => {
    try {
      if (isHasCopy) {
        return
      }

      if (!isURL(url)) {
        return shakeInputField()
      }

      setHasLoading(true)

      const response = await fetch('/api/shortener', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })

      const data: ApiReponse = await response.json()

      if (data.ok) {
        setValue('url', window.location.href + data.slug)
        addToHistory(data)
        setHasCopy(true)

        if (history.length === 1) {
          scrollToHistory()
        }
      } else {
        shakeInputField()
      }
    } catch (err) {
      alert(err)
    } finally {
      setFocus('url')
      setHasLoading(false)
    }
  }

  const addToHistory = ({ url, slug, visitors, created_at }: ApiReponse) => {
    history.unshift({ url, slug, visitors, created_at })
    window.localStorage.setItem('history', JSON.stringify(history))
  }

  const formOnChange = () => {
    if (isHasCopy) {
      setValue('url', '')
      setHasCopy(false)
    }
  }

  const scrollToHistory = () => {
    historyRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const shakeInputField = () => {
    formRef.current.classList.add('input-shake')
  }

  return (
    <React.Fragment>
      <div className="header-container">
        <GithubCorner />
        <div className="container">
          <h1>URL Shortener</h1>
          <form
            ref={formRef}
            className="input-form"
            onSubmit={handleSubmit(onSubmitForm)}
            onChange={formOnChange}
          >
            <input
              type="text"
              autoComplete="off"
              placeholder="Shorten your link"
              {...register('url')}
            />
            {isHasCopy ?
              <Clipboard
                className="form-button"
                text={getValues('url')}
              />
              :
              <button className="form-button">
                {isHasLoading ?
                  <LoadingIcon /> :
                  <ArrowRightIcon />
                }
              </button>
            }
          </form>
          {history.length > 0 &&
            <div
              onClick={scrollToHistory}
              className="chevron-button"
            >
              <ChevronDownIcon />
            </div>
          }
        </div>
      </div>
      {history.length > 0 &&
        <History
          ref={historyRef}
          history={history}
          setHistory={setHistory}
        />
      }
    </React.Fragment>
  )
}