import { useGetMultipleCourse } from '../../../hooks/useGetMultipleCourse'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CloudOffIcon from '@mui/icons-material/CloudOff'
import { SERVER_ROUTES } from '../../../services/config/constants.config'
import { Link } from 'react-router-dom'

export function HomeCourses (): JSX.Element {
  const { coursesList } = useGetMultipleCourse(6, 1)

  if (coursesList == null) {
    return (
      <Container maxWidth='md' sx={{ textAlign: 'center', mt: 2 }}>
        <h2
          style={{ textAlign: 'center', paddingTop: '1rem', paddingBottom: '0.5rem' }}
        >
          INTERESTING COURSES
        </h2>

        <Box
          component='div'
          sx={{
            minHeight: '10rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <CircularProgress color='inherit' size={30} sx={{ m: '1rem auto' }}/>
        </Box>
      </Container>
    )
  } else if (coursesList.length === 0) {
    return (
      <Container maxWidth='md' sx={{ textAlign: 'center', mt: 2 }}>
        <h2
          style={{ textAlign: 'center', paddingTop: '1rem', paddingBottom: '0.5rem' }}
        >
          INTERESTING COURSES
        </h2>

        <Box
          component='div'
          sx={{
            minHeight: '10rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <span
            style={{
              margin: '0.6rem auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Sorry, no courses data
            <CloudOffIcon fontSize='medium' sx={{ pl: 1 }} />
          </span>
          <span>Try reload</span>
        </Box>
      </Container>
    )
  } else {
    return (
      <Container maxWidth='md' sx={{ textAlign: 'center', mt: 2 }}>
        <h2
          style={{ textAlign: 'center', paddingTop: '1rem', paddingBottom: '0.5rem' }}
        >
          INTERESTING COURSES
        </h2>

        <Box
          component='div'
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: { xs: '1.5rem', sm: '1.8rem', md: '2.4rem' }
          }}
        >
          {
            coursesList.map((courseList) => (
              <Card
                key={courseList._id}
                sx={{
                  width: { xs: '100%', sm: '49%' },
                  minWidth: '152px',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'transparent'
                }}
              >
                <CardActionArea
                  component='a'
                  href={courseList.url}
                  target='_blank'
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexGrow: '1',
                    alignItems: 'flex-start',
                    '&:hover': { opacity: '0.7' }
                  }}
                >
                  <CardMedia
                    component='img'
                    src={courseList.miniature != null
                      ? `${SERVER_ROUTES.BASE_PATH}/${courseList.miniature}`
                      : ''
                    }
                    alt='miniature'
                    sx={{
                      width: { xs: '7.2rem', sm: '36%', md: '39%' },
                      aspectRatio: '1.7/1',
                      objectFit: 'fill',
                      m: 'auto'
                    }}
                    loading='lazy'
                  />
                  <CardContent sx={{ flexGrow: '1', p: '0 0.6rem 0 0.6rem' }}>
                    <Typography
                      component='p'
                      gutterBottom
                      variant='body2'
                      sx={{
                        textAlign: 'left',
                        lineHeight: '1.1rem',
                        fontWeight: 'bold',
                        color: 'white',
                        wordBreak: { xs: 'break-all', sm: 'break-word' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '2'
                      }}
                    >
                      {courseList.title}
                    </Typography>
                    <Typography
                      component='p'
                      variant='caption'
                      color='text.secondary'
                      sx={{
                        textAlign: 'left',
                        lineHeight: '0.9rem',
                        color: 'white',
                        opacity: '0.8',
                        wordBreak: { xs: 'break-all', sm: 'break-word' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: { xs: '2', sm: '3' }
                      }}
                    >
                      {courseList.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          }
        </Box>

        <Button
          variant='outlined'
          component={Link}
          to='/courses'
          sx={{ mt: 3, mb: 4, minWidth: '8.7rem', textTransform: 'capitalize' }}
        >
          See All
        </Button>
      </Container>
    )
  }
}
