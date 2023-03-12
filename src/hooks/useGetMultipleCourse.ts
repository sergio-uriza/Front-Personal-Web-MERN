import { useEffect, useState } from 'react'
import { getMultipleCourse } from '../services/courseService'
import { CourseTypeAPI } from '../services/types'

type UseGetMultipleCourseType = {
  coursesList: CourseTypeAPI[] | null
}

export const useGetMultipleCourse = (page: number, handleTotalPage: (value: number) => void, newGet?: boolean): UseGetMultipleCourseType => {
  const [coursesList, setCoursesList] = useState<CourseTypeAPI[] | null>(null)

  useEffect(() => {
    setCoursesList(null)
    getMultipleCourse(10, page)
      .then((res) => {
        setCoursesList(res.docs)
        handleTotalPage(res.totalPages)
      })
      .catch((_err) => {
        setCoursesList([])
        handleTotalPage(1)
      })
  }, [handleTotalPage, newGet, page])

  return {
    coursesList
  }
}
