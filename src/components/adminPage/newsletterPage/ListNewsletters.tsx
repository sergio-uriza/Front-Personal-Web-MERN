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

export const ListNewsletters = memo(function ListNewsletters ({ page, handleTotalPage, order, newGet, handleNewGet }: PropsType): JSX.Element {
  const { listNewsletters } = useGetMultipleNewsletter(page, handleTotalPage, order, newGet)

  if (listNewsletters == null) return (<CircularProgress color='inherit' size={20} sx={{ m: 'auto' }}/>)
  if (listNewsletters.length === 0) return <span style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Data<StopScreenShareIcon fontSize='medium' sx={{ pl: 1 }} /></span>

  return (
    <>
      {
        listNewsletters.map((listNewsletter) => (
          <NewsletterItem key={listNewsletter._id} newsletter={listNewsletter} handleNewGet={handleNewGet} />
        ))
      }
    </>
  )
})
