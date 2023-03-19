import { useCallback, useState } from 'react'
import { Box } from '@mui/material'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Pagination from '@mui/material/Pagination'
import CircularProgress from '@mui/material/CircularProgress'
import CloudOffIcon from '@mui/icons-material/CloudOff'
import GroupsIcon from '@mui/icons-material/Groups'
import { useGetMultipleBlog } from '../../hooks/useGetMultipleBlog'
import { BlogElement } from '../../components/webPage/blogPage/BlogElement'
import { useNavigate, useSearchParams } from 'react-router-dom'

export function BlogPage (): JSX.Element {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const getLastPage = (): number | undefined => {
    if (searchParams.get('page') != null && !isNaN(Number(searchParams.get('page')))) {
      return Math.round(Number(searchParams.get('page'))) < 1
        ? 1
        : Math.round(Number(searchParams.get('page')))
    }
    return undefined
  }

  const [page, setPage] = useState<number>(getLastPage() ?? 1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const handlePage = (e: React.ChangeEvent<unknown>, v: number): void => {
    setPage(v)
    navigate(`?page=${v}`)
  }
  const handleTotalPages = useCallback((value: number): void => {
    setTotalPages(value)
  }, [])

  const { blogsList } = useGetMultipleBlog(12, page, handleTotalPages)

  if (blogsList == null) {
    return (
      <Container maxWidth='md' sx={{ textAlign: 'center', mt: '4rem', mb: '7rem' }}>
        <GroupsIcon
          sx={{
            fontSize: { xs: '3.5rem', sm: '3.5rem', md: '4.1rem', color: 'white' }
          }}
        />
        <h3
          style={{
            textAlign: 'center',
            marginTop: '0.8rem',
            paddingTop: 0,
            paddingBottom: '2rem'
          }}
        >
          In this section you can see the publications of other users and also share your knowledge, experience and opinions about any formal topic.
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
  } else if (blogsList.length === 0) {
    return (
      <Container maxWidth='md' sx={{ textAlign: 'center', mt: '4rem', mb: '7rem' }}>
        <GroupsIcon
          sx={{ fontSize: { xs: '3.5rem', sm: '3.5rem', md: '4.1rem', color: 'white' } }}
        />
        <h3
          style={{
            textAlign: 'center',
            marginTop: '0.8rem',
            paddingTop: 0,
            paddingBottom: '2rem'
          }}
        >
          In this section you can see the publications of other users and also share your knowledge, experience and opinions about any formal topic.
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
            No Courses Data
            <CloudOffIcon fontSize='medium' sx={{ pl: 1 }} />
          </span>
        </Box>
      </Container>
    )
  } else {
    return (
      <Container maxWidth='md' sx={{ textAlign: 'center', mt: '4rem', mb: '7rem' }}>
        <GroupsIcon
          sx={{ fontSize: { xs: '3.5rem', sm: '3.5rem', md: '4.1rem', color: 'white' } }}
        />
        <h3
          style={{
            textAlign: 'center',
            marginTop: '0.8rem',
            paddingTop: 0,
            paddingBottom: '2rem'
          }}
        >
          In this section you can see the publications of other users and also share your knowledge, experience and opinions about any formal topic.
        </h3>

        <Box
          component='div'
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', sm: 'space-between' },
            rowGap: { xs: '1.5rem', sm: '1.8rem', md: '2.4rem' }
          }}
        >
          {
            blogsList.map((blogList) => (
              <BlogElement key={blogList._id} blog={blogList} />
            ))
          }
        </Box>

        <Stack
          spacing={1}
          sx={{
            position: 'sticky',
            bottom: '1rem',
            zIndex: '0',
            alignItems: 'center',
            mt: '2rem'
          }}
        >
          <Pagination
            sx={{
              ' button': { color: 'white', border: '1px solid rgba(255, 255, 255, 0.23)', bgcolor: '#16212b' },
              ' .css-1v2lvtn-MuiPaginationItem-root': { color: 'white' }
            }}
            count={totalPages}
            page={page <= totalPages ? page : totalPages}
            onChange={handlePage}
            color='secondary'
            siblingCount={0}
          />
        </Stack>
      </Container>
    )
  }
}
