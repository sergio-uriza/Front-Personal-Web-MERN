import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuthContext } from '../../hooks/context/useAuthContext'
import { useNavigate } from 'react-router-dom'

type PropsType = {
  redirectTo: string
}

export function ButtonLogout ({ redirectTo }: PropsType): JSX.Element {
  const { logoutAuthHandler } = useAuthContext()
  const navigate = useNavigate()

  const onLogout = (): void => {
    logoutAuthHandler()
    navigate(redirectTo)
  }

  return (
    <Button
      variant='text'
      color='secondary'
      size='small'
      startIcon={<LogoutIcon />}
      onClick={onLogout}
    >
      Logout
    </Button>
  )
}
