import { useEffect, useState } from 'react'
import { getMultipleCourse } from '../services/courseService'
import { CourseTypeAPI } from '../services/types/api-res'

type UseGetMultipleCourseType = {
  coursesList: CourseTypeAPI[] | null
}

export const useGetMultipleCourse = (
  limit: number,
  page: number,
  handleTotalPages?: (value: number) => void,
  newGet?: boolean
): UseGetMultipleCourseType => {
  const [coursesList, setCoursesList] = useState<CourseTypeAPI[] | null>(null)

  useEffect(() => {
    setCoursesList(null)
    getMultipleCourse(limit, page)
      .then((res) => {
        setCoursesList(res.docs)
        if (handleTotalPages != null) handleTotalPages(res.totalPages)
      })
      .catch((_err) => {
        setCoursesList([])
        if (handleTotalPages != null) handleTotalPages(1)
      })
  }, [handleTotalPages, limit, newGet, page])

  return {
    coursesList
  }
}
