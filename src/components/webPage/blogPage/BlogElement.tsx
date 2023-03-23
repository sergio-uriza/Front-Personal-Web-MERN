import { BlogTypeAPI } from '../../../services/types/api-res'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { SERVER_ROUTES } from '../../../services/config/constants.config'
import { DateTime } from 'luxon'

type PropsType = {
  blog: BlogTypeAPI
}

export function BlogElement ({ blog }: PropsType): JSX.Element {
  const date = new Date(blog.createdAt)

  return (
    <Card
      key={blog._id}
      sx={{
        width: { xs: '70%', sm: '32%', md: '30%' },
        minWidth: '152px',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'transparent',
        '&:hover': { boxShadow: '0 0 10px 2px rgb(255 255 255 / 75%)' }
      }}
    >
      <CardActionArea
        component={Link}
        to={`/blog${blog.path}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
          alignItems: 'flex-start'
        }}
      >
        <CardMedia
          component='img'
          src={blog.miniature != null
            ? `${SERVER_ROUTES.BASE_PATH}/${blog.miniature}`
            : undefined
          }
          alt='miniature'
          sx={{ width: '100%', aspectRatio: '1.7/1', objectFit: 'fill', m: 'auto' }}
          loading='lazy'
        />
        <CardContent sx={{ width: '100%', flexGrow: '1', p: '0.8rem' }}>
          <Typography
            component='p'
            gutterBottom
            variant='body2'
            sx={{
              textAlign: 'center',
              lineHeight: '1.1rem',
              fontWeight: 'bold',
              color: 'white',
              wordBreak: { xs: 'break-all', sm: 'break-word' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '3'
            }}
          >
            {blog.title}
          </Typography>
          <Typography
            component='p'
            variant='caption'
            sx={{
              textAlign: 'center',
              lineHeight: '0.9rem',
              color: 'white',
              opacity: '0.8',
              wordBreak: { xs: 'break-all', sm: 'break-word' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '2'
            }}
          >
            {blog.user != null
              ? `Posted by: ${blog.user.firstname} ${blog.user.lastname}`
              : 'Posted by: Anonymous User'
            }
          </Typography>
        </CardContent>
        <Box
          component='div'
          sx={{
            width: '100%',
            p: '0.8rem',
            pt: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography
            component='p'
            variant='overline'
            align='right'
            sx={{
              fontSize: { xs: '0.7rem', sm: '0.6rem', md: '0.7rem' },
              lineHeight: 'inherit',
              color: 'white',
              flexGrow: '1'
            }}
          >
            {DateTime.fromISO(date.toISOString()).setLocale('es').toFormat('dd \'de\' LLL \'del\' yyyy')}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}
