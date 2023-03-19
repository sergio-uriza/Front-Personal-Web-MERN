import { useEffect, useState } from 'react'
import { getMultipleNewsletter } from '../services/newsletterService'
import { NewsletterTypeAPI } from '../services/types/api-res'
import { useAuthContext } from './context/useAuthContext'

type UseGetMultipleNewsletterType = {
  newslettersList: NewsletterTypeAPI[] | null
}

export const useGetMultipleNewsletter = (
  limit: number,
  page: number,
  handleTotalPage: (value: number) => void,
  order?: number,
  newGet?: boolean
): UseGetMultipleNewsletterType => {
  const [newslettersList, setNewslettersList] = useState<NewsletterTypeAPI[] | null>(null)
  const { accessToken } = useAuthContext()

  useEffect(() => {
    setNewslettersList(null)
    getMultipleNewsletter(accessToken, limit, page, order)
      .then((res) => {
        setNewslettersList(res.docs)
        handleTotalPage(res.totalPages)
      })
      .catch((_err) => {
        setNewslettersList([])
        handleTotalPage(1)
      })
  }, [accessToken, handleTotalPage, limit, newGet, order, page])

  return {
    newslettersList
  }
}
