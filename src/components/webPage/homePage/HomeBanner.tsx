import './HomeBanner.scss'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export function HomeBanner (): JSX.Element {
  return (
    <Box component='div' className='homebanner-main'>
      <Container maxWidth='md' className='banner-text'>
        <Typography
          component='h1'
          variant='h4'
          color='white'
          align='left'
          sx={{
            mt: { xs: 3 },
            mb: 2,
            fontSize: { xs: '1.19rem', sd: '2rem', md: '2.125rem' },
            maxWidth: { xs: '55%', sm: '50%', md: '65%' },
            fontWeight: 'bold'
          }}
        >
          Interact with a responsive website made completely from scratch
        </Typography>
        <Typography
          component='h2'
          variant='h6'
          color='white'
          align='left'
          sx={{
            mt: 3,
            mb: { xs: 2 },
            fontSize: { xs: '0.8rem', sd: '1rem', md: '1.25rem' },
            maxWidth: { xs: '50%', sm: '45%', md: '55%' }
          }}
        >
          Both frontend and backend, applied through constant reading and feedback
        </Typography>
      </Container>

      <div className='banner-dark' />
    </Box>
  )
}
