import { useEffect, useState } from 'react'
import { getMyMultipleBlog } from '../services/blogService'
import { GetMyBlogType } from '../services/types/api-res'
import { useAuthContext } from './context/useAuthContext'

type UseGetMyMultipleBlogType = {
  myBlogsList: GetMyBlogType[] | null
}

export const useGetMyMultipleBlog = (
  limit: number,
  page: number,
  handleTotalPage: (value: number) => void,
  newGet?: boolean
): UseGetMyMultipleBlogType => {
  const [myBlogsList, setMyBlogsList] = useState<GetMyBlogType[] | null>(null)
  const { accessToken } = useAuthContext()

  useEffect(() => {
    setMyBlogsList(null)
    getMyMultipleBlog(accessToken, limit, page)
      .then((res) => {
        setMyBlogsList(res.docs)
        handleTotalPage(res.totalPages)
      })
      .catch((_err) => {
        setMyBlogsList([])
        handleTotalPage(1)
      })
  }, [accessToken, handleTotalPage, limit, newGet, page])

  return {
    myBlogsList
  }
}
