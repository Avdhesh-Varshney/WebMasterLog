import { getBaseUrl } from '@/utils/api'
import { ShortUrl } from '@/pages/api/urls'

type PostArgs = {
  arg: { url: string }
}

export const getFetcher = <T>(url: string) =>
  fetch(url).then<T>(res => res.json())
export const postFetcher = <T>(url: string, { arg }: PostArgs) =>
  fetch(url, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(arg)
  }).then<T>(res => res.json())

export const urlsUrl = `${getBaseUrl()}/api/urls`
export const fetchUrls = () => getFetcher<ShortUrl[]>(urlsUrl)
export const postUrl = (url: string) => postFetcher(urlsUrl, { arg: { url } })
export const fetchUrl = (id: number) =>
  fetchUrls().then(urls => urls.find(u => u.id === id)?.url)
