import { CourseTypeAPI } from '../../../services/types/api-res'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import { Box } from '@mui/material'
import { SERVER_ROUTES } from '../../../services/config/constants.config'

const numberFormat = new Intl.NumberFormat('en-US')

type PropsType = {
  course: CourseTypeAPI
}

export function CourseElement ({ course }: PropsType): JSX.Element {
  return (
    <Card
      key={course._id}
      sx={{
        width: { xs: '70%', sm: '32%', md: '30%' },
        minWidth: '152px',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'transparent',
        '&:hover': { boxShadow: '0 0 10px 2px rgb(0 0 0 / 75%)' }
      }}
    >
      <CardActionArea
        component='a'
        href={course.url}
        target='_blank'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
          alignItems: 'flex-start'
        }}
      >
        <CardMedia
          component='img'
          src={course.miniature != null
            ? `${SERVER_ROUTES.BASE_PATH}/${course.miniature}`
            : undefined
          }
          alt='miniature'
          sx={{ width: '100%', aspectRatio: '1.7/1', objectFit: 'fill', m: 'auto' }}
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
              WebkitLineClamp: '2'
            }}
          >
            {course.title}
          </Typography>
          <Typography
            component='p'
            variant='caption'
            sx={{
              textAlign: 'justify',
              lineHeight: '0.9rem',
              color: 'white',
              opacity: '0.8',
              wordBreak: { xs: 'break-all', sm: 'break-word' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: { xs: '5', sm: '8' }
            }}
          >
            {course.description}
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
          <Rating
            sx={{
              fontSize: { xs: '1rem', sm: '0.9rem', md: '1.2rem' },
              ' .css-1c99szj-MuiRating-icon': { color: 'gray' }
            }}
            defaultValue={course.score}
            precision={0.1}
            readOnly
          />
          <Typography
            component='p'
            variant='overline'
            align='right'
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.65rem', md: '0.77rem' },
              lineHeight: 'inherit',
              color: 'white',
              flexGrow: '1'
            }}
          >
            ${numberFormat.format(course.price)} COL
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}
