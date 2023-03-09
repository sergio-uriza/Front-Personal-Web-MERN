import CircularProgress from '@mui/material/CircularProgress'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import { memo } from 'react'
import { useGetMultipleMenu } from '../../../hooks/useGetMultipleMenu'
import { MenuItem } from './MenuItem'

type PropsType = {
  isMenuActive: boolean
  newGet: boolean
  handleNewGet: () => void
}

export const ListMenus = memo(function ListMenus ({ isMenuActive, newGet, handleNewGet }: PropsType): JSX.Element {
  const { listMenus } = useGetMultipleMenu(isMenuActive, newGet)

  if (listMenus == null) return (<CircularProgress color='inherit' size={20} />)
  if (listMenus.length === 0) return <>No Data<StopScreenShareIcon fontSize='medium' sx={{ pl: 1 }} /></>

  return (
    <>
      {
        listMenus.map((listMenu) => (
          <MenuItem key={listMenu._id} menu={listMenu} handleNewGet={handleNewGet} />
        ))
      }
    </>
  )
})