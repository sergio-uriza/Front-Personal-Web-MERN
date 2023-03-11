import { useEffect, useState } from 'react'
import { getMultipleCourse } from '../services/courseService'
import { CourseTypeAPI } from '../services/types'

type UseGetMultipleCourseType = {
  listCourses: CourseTypeAPI[] | null
}

export const useGetMultipleCourse = (page: number, handleTotalPage: (value: number) => void, newGet?: boolean): UseGetMultipleCourseType => {
  const [listCourses, setListCourses] = useState<CourseTypeAPI[] | null>(null)

  useEffect(() => {
    setListCourses(null)
    getMultipleCourse(5, page)
      .then((res) => {
        setListCourses(res.docs)
        handleTotalPage(res.totalPages)
      })
      .catch((_err) => {
        setListCourses([])
        handleTotalPage(1)
      })
  }, [handleTotalPage, newGet, page])

  return {
    listCourses
  }
}
