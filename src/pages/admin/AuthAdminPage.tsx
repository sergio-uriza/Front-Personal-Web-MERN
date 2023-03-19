import './AuthAdminPage.scss'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { LoginForm } from '../../components/forms/LoginForm'
import { IconMERN } from '../../assets/svg/IconMERN'

export function AuthAdminPage (): JSX.Element {
  return (
    <div className='authadminpage-page'>
      <Container maxWidth='sm'>
        <IconMERN className='logo'/>
        <Box className='box-panel' sx={{ py: 2 }}>
          <Typography
            component='h1'
            variant='h5'
            sx={{ textAlign: 'center' }}
          >
            Sign in
          </Typography>
          <LoginForm isAdmin={true} />
        </Box>
      </Container>
    </div>
  )
}
