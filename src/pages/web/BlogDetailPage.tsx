import { useParams } from 'react-router-dom'
import { useGetByPathBlog } from '../../hooks/useGetByPathBlog'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import CloudOffIcon from '@mui/icons-material/CloudOff'
import ReactHtmlParser from 'react-html-parser'
import { SERVER_ROUTES } from '../../services/config/routes.config'

export function BlogDetailPage (): JSX.Element {
  const { path } = useParams()
  const { blog, isLoadingBlog } = useGetByPathBlog(path)

  if (isLoadingBlog) {
    return (
      <Container maxWidth='md' sx={{ textAlign: 'center', mt: '4rem', mb: '7rem' }}>
        <h3
          style={{
            textAlign: 'center',
            marginTop: '0.8rem',
            paddingTop: 0,
            paddingBottom: '0.7rem'
          }}
        >
          Recovering Post
        </h3>

        <Box
          component='div'
          sx={{
            minHeight: '40vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress color='inherit' size={40} sx={{ m: '2rem auto' }}/>
        </Box>
      </Container>
    )
  } else if (blog == null) {
    return (
      <Container maxWidth='md' sx={{ textAlign: 'center', mt: '4rem', mb: '7rem' }}>
        <h3
          style={{
            textAlign: 'center',
            marginTop: '0.8rem',
            paddingTop: 0,
            paddingBottom: '0.7rem'
          }}
        >
          It seems we can not load the post
        </h3>

        <Box
          component='div'
          sx={{
            minHeight: '40vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <span
            style={{
              margin: '2rem auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            No Post Data
            <CloudOffIcon fontSize='medium' sx={{ pl: 1 }} />
          </span>
        </Box>
      </Container>
    )
  } else {
    return (
      <Container maxWidth='md' sx={{ textAlign: 'center', mt: '4rem', mb: '7rem' }}>
        <h2
          style={{
            textAlign: 'center',
            marginTop: '0.8rem',
            paddingTop: 0,
            paddingBottom: '0.7rem'
          }}
        >
          {blog.title}
        </h2>
        { blog.miniature != null
          ? <img
              src={`${SERVER_ROUTES.BASE_PATH}/${blog.miniature}`}
              alt='Miniature'
              style={{
                width: '60%',
                aspectRatio: '1.6/1',
                objectFit: 'fill',
                margin: 'auto',
                borderRadius: '13px'
              }}
            />
          : null
        }

        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            all: 'revert',
            textAlign: 'initial',
            wordBreak: 'break-word',
            '& pre': { lineHeight: '1rem', fontSize: 'initial', wordBreak: 'normal' }
          }}
        >
          {ReactHtmlParser(blog.content)}
        </Box>
      </Container>
    )
  }
}
