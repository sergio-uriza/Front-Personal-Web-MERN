import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

export function NotFoundPage (): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        color: 'white',
        backgroundColor: '#16212b'
      }}
    >
      <Typography variant='h1' style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant='h6' style={{ color: 'white' }}>
        The page you are looking for does not exist.
      </Typography>
      <Button component={Link} to='/' variant='outlined' sx={{ mt: 3 }}>
        Back Home
      </Button>
    </Box>
  )
}
