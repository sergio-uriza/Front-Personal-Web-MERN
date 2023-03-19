import CircularProgress from '@mui/material/CircularProgress'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import { memo } from 'react'
import { useGetMultipleCourse } from '../../../hooks/useGetMultipleCourse'
import { CourseItem } from './CourseItem'

type PropsType = {
  page: number
  handleTotalPages: (value: number) => void
  newGet: boolean
  handleNewGet: () => void
}

export const CoursesList = memo(function CoursesList ({
  page,
  handleTotalPages,
  newGet,
  handleNewGet
}: PropsType): JSX.Element {
  const { coursesList } = useGetMultipleCourse(10, page, handleTotalPages, newGet)

  if (coursesList == null) {
    return (
      <CircularProgress color='inherit' size={20} sx={{ m: 'auto' }}/>
    )
  }
  if (coursesList.length === 0) {
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
        coursesList.map((courseList) => (
          <CourseItem key={courseList._id} course={courseList} handleNewGet={handleNewGet} />
        ))
      }
    </>
  )
})
