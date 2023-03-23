import { GetMyUserType } from '../../services/types/api-res'
import Typography from '@mui/material/Typography'

type PropsType = {
  loggedUser: GetMyUserType | null
}

export function WelcomeAdminPage ({ loggedUser }: PropsType): JSX.Element {
  return (
    <Typography component='p' variant='h5' sx={{ mt: 2, px: 3, textAlign: 'center' }}>
      Welcome
      {loggedUser != null
        ? ` ${loggedUser.firstname} ${loggedUser.lastname}`
        : null
      }
      , has administrative control of the entire application through the tools provided in this section.
    </Typography>
  )
}
