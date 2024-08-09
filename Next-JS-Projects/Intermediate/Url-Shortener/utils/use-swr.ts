import useSWRMutation from 'swr/mutation'
import { postFetcher, urlsUrl } from '@/utils/urlsFetcher'

export const usePostUrlMutation = () => {
  const { isMutating, reset, data, error, trigger } = useSWRMutation<string>(
    urlsUrl,
    postFetcher
  )
  return { isMutating, reset, id: data, error, trigger }
}
