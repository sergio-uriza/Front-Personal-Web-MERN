import { GetMyUserType } from '../../services/types/api-res'
import Typography from '@mui/material/Typography'

type PropsType = {
  loggedUser: GetMyUserType | null
}

export function WelcomeUserPage ({ loggedUser }: PropsType): JSX.Element {
  return (
    <Typography component='p' variant='h5' sx={{ mt: 2, px: 3, textAlign: 'center' }}>
      Welcome
      {loggedUser != null
        ? ` ${loggedUser.firstname} ${loggedUser.lastname}`
        : null
      }
      , from here you can customize your account information, you can also write, edit and delete your own personal blogs.
    </Typography>
  )
}
