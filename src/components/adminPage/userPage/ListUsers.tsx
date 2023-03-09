import { useGetMultipleUser } from '../../../hooks/useGetMultipleUser'
import CircularProgress from '@mui/material/CircularProgress'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import { memo } from 'react'
import { UserItem } from './UserItem'

type PropsType = {
  isUserActive: boolean
  newGet: boolean
  handleNewGet: () => void
}

export const ListUsers = memo(function ListUsers ({ isUserActive, newGet, handleNewGet }: PropsType): JSX.Element {
  const { listUsers } = useGetMultipleUser(isUserActive, newGet)

  if (listUsers == null) return (<CircularProgress color='inherit' size={20} />)
  if (listUsers.length === 0) return <>No Data<StopScreenShareIcon fontSize='medium' sx={{ pl: 1 }} /></>

  return (
    <>
      {
        listUsers.map((listUser) => (
          <UserItem key={listUser._id} user={listUser} handleNewGet={handleNewGet} />
        ))
      }
    </>
  )
})