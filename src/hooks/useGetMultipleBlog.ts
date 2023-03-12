import { useEffect, useState } from 'react'
import { getMultipleBlog } from '../services/blogService'
import { BlogTypeAPI } from '../services/types'

type UseGetMultipleBlogType = {
  blogsList: BlogTypeAPI[] | null
}

export const useGetMultipleBlog = (page: number, handleTotalPage: (value: number) => void, newGet?: boolean): UseGetMultipleBlogType => {
  const [blogsList, setBlogsList] = useState<BlogTypeAPI[] | null>(null)

  useEffect(() => {
    setBlogsList(null)
    getMultipleBlog(15, page)
      .then((res) => {
        setBlogsList(res.docs)
        handleTotalPage(res.totalPages)
      })
      .catch((_err) => {
        setBlogsList([])
        handleTotalPage(1)
      })
  }, [handleTotalPage, newGet, page])

  return {
    blogsList
  }
}
