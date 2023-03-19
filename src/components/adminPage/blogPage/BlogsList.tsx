import { memo } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import { useGetMultipleBlog } from '../../../hooks/useGetMultipleBlog'
import { BlogItem } from './BlogItem'

type PropsType = {
  page: number
  handleTotalPages: (value: number) => void
  newGet: boolean
  handleNewGet: () => void
}

export const BlogsList = memo(function BlogsList ({
  page,
  handleTotalPages,
  newGet,
  handleNewGet
}: PropsType): JSX.Element {
  const { blogsList } = useGetMultipleBlog(15, page, handleTotalPages, newGet)

  if (blogsList == null) {
    return (
      <CircularProgress color='inherit' size={20} sx={{ m: 'auto' }}/>
    )
  }
  if (blogsList.length === 0) {
    return (
      <span style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        No Data
        <StopScreenShareIcon fontSize='medium' sx={{ pl: 1 }} />
      </span>
    )
  }

  return (
    <>
      {
        blogsList.map((blogList) => (
          <BlogItem key={blogList._id} blog={blogList} handleNewGet={handleNewGet} />
        ))
      }
    </>
  )
})
