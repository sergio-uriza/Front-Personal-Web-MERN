import { useEffect, useState } from 'react'
import { getMultipleBlog } from '../services/blogService'
import { BlogTypeAPI } from '../services/types/api-res'

type UseGetMultipleBlogType = {
  blogsList: BlogTypeAPI[] | null
}

export const useGetMultipleBlog = (
  limit: number,
  page: number,
  handleTotalPage: (value: number) => void,
  newGet?: boolean
): UseGetMultipleBlogType => {
  const [blogsList, setBlogsList] = useState<BlogTypeAPI[] | null>(null)

  useEffect(() => {
    setBlogsList(null)
    getMultipleBlog(limit, page)
      .then((res) => {
        setBlogsList(res.docs)
        handleTotalPage(res.totalPages)
      })
      .catch((_err) => {
        setBlogsList([])
        handleTotalPage(1)
      })
  }, [handleTotalPage, limit, newGet, page])

  return {
    blogsList
  }
}
