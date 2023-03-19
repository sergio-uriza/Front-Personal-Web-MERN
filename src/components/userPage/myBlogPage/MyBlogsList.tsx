import { memo } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import { useGetMyMultipleBlog } from '../../../hooks/useGetMyMultipleBlog'
import { MyBlogItem } from './MyBlogItem'

type PropsType = {
  page: number
  handleTotalPages: (value: number) => void
  newGet: boolean
  handleNewGet: () => void
}

export const MyBlogsList = memo(function MyBlogsList ({
  page,
  handleTotalPages,
  newGet,
  handleNewGet
}: PropsType): JSX.Element {
  const { myBlogsList } = useGetMyMultipleBlog(15, page, handleTotalPages, newGet)

  if (myBlogsList == null) {
    return (
      <CircularProgress color='inherit' size={20} sx={{ m: 'auto' }}/>
    )
  }
  if (myBlogsList.length === 0) {
    return (
      <span style={{
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        No Data
        <StopScreenShareIcon fontSize='medium' sx={{ pl: 1 }} />
      </span>
    )
  }

  return (
    <>
      {
        myBlogsList.map((myBlogList) => (
          <MyBlogItem
            key={myBlogList._id}
            myBlog={myBlogList}
            handleNewGet={handleNewGet}
          />
        ))
      }
    </>
  )
})
