import { useEffect, useState } from 'react'
import { getMyMultipleBlog } from '../services/blogService'
import { GetMyBlogType } from '../services/types/api-res'

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

  useEffect(() => {
    setMyBlogsList(null)
    getMyMultipleBlog(limit, page)
      .then((res) => {
        setMyBlogsList(res.docs)
        handleTotalPage(res.totalPages)
      })
      .catch((_err) => {
        setMyBlogsList([])
        handleTotalPage(1)
      })
  }, [handleTotalPage, limit, newGet, page])

  return {
    myBlogsList
  }
}
