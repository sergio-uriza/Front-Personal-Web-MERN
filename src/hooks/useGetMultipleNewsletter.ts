import { useEffect, useState } from 'react'
import { getMultipleNewsletter } from '../services/newsletterService'
import { NewsletterTypeAPI } from '../services/types'
import { useAuthContext } from './context/useAuthContext'

type UseGetMultipleNewsletterType = {
  listNewsletters: NewsletterTypeAPI[] | null
}

export const useGetMultipleNewsletter = (page: number, handleTotalPage: (value: number) => void, order?: number, newGet?: boolean): UseGetMultipleNewsletterType => {
  const [listNewsletters, setListNewsletters] = useState<NewsletterTypeAPI[] | null>(null)
  const { accessToken } = useAuthContext()

  useEffect(() => {
    setListNewsletters(null)
    getMultipleNewsletter(accessToken, 20, page, order)
      .then((res) => {
        setListNewsletters(res.docs)
        handleTotalPage(res.totalPages)
      })
      .catch((_err) => {
        setListNewsletters([])
        handleTotalPage(1)
      })
  }, [accessToken, handleTotalPage, newGet, order, page])

  return {
    listNewsletters
  }
}
