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

export const MenusList = memo(function MenusList ({ isMenuActive, newGet, handleNewGet }: PropsType): JSX.Element {
  const { menusList } = useGetMultipleMenu(isMenuActive, newGet)

  if (menusList == null) return (<CircularProgress color='inherit' size={20} sx={{ m: 'auto' }}/>)
  if (menusList.length === 0) return <span style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Data<StopScreenShareIcon fontSize='medium' sx={{ pl: 1 }} /></span>

  return (
    <>
      {
        menusList.map((menuList) => (
          <MenuItem key={menuList._id} menu={menuList} handleNewGet={handleNewGet} />
        ))
      }
    </>
  )
})
