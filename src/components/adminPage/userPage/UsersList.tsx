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

export const UsersList = memo(function UsersList ({
  isUserActive,
  newGet,
  handleNewGet
}: PropsType): JSX.Element {
  const { usersList } = useGetMultipleUser(isUserActive, newGet)

  if (usersList == null) {
    return (
      <CircularProgress color='inherit' size={20} sx={{ m: 'auto' }}/>
    )
  }
  if (usersList.length === 0) {
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
        usersList.map((userList) => (
          <UserItem key={userList._id} user={userList} handleNewGet={handleNewGet} />
        ))
      }
    </>
  )
})
