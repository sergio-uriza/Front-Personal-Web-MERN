import { useEffect, useState } from 'react'
import { getByPathBlog } from '../services/blogService'
import { BlogTypeAPI } from '../services/types/api-res'

type UseGetMultipleBlogType = {
  blog: BlogTypeAPI | null
  isLoadingBlog: boolean
}

export const useGetByPathBlog = (path?: string): UseGetMultipleBlogType => {
  const [blog, setBlog] = useState<BlogTypeAPI | null>(null)
  const [isLoadingBlog, setIsLoadingBlog] = useState<boolean>(false)

  useEffect(() => {
    setIsLoadingBlog(true)
    setBlog(null)
    getByPathBlog(path)
      .then((res) => {
        setBlog(res)
        setIsLoadingBlog(false)
      })
      .catch((_err) => {
        setBlog(null)
        setIsLoadingBlog(false)
      })
  }, [path])

  return {
    blog,
    isLoadingBlog
  }
}
