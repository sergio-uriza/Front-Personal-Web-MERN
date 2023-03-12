import CircularProgress from '@mui/material/CircularProgress'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import { useGetMultipleNewsletter } from '../../../hooks/useGetMultipleNewsletter'
import { memo } from 'react'
import { NewsletterItem } from './NewsletterItem'

type PropsType = {
  page: number
  handleTotalPage: (value: number) => void
  order: number
  newGet: boolean
  handleNewGet: () => void
}

export const NewslettersList = memo(function NewslettersList ({ page, handleTotalPage, order, newGet, handleNewGet }: PropsType): JSX.Element {
  const { newslettersList } = useGetMultipleNewsletter(page, handleTotalPage, order, newGet)

  if (newslettersList == null) return (<CircularProgress color='inherit' size={20} sx={{ m: 'auto' }}/>)
  if (newslettersList.length === 0) return <span style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Data<StopScreenShareIcon fontSize='medium' sx={{ pl: 1 }} /></span>

  return (
    <>
      {
        newslettersList.map((newsletterList) => (
          <NewsletterItem key={newsletterList._id} newsletter={newsletterList} handleNewGet={handleNewGet} />
        ))
      }
    </>
  )
})
