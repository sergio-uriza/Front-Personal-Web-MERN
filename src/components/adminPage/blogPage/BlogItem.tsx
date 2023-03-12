import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PreviewIcon from '@mui/icons-material/Preview'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { BasicModal } from '../../shared/BasicModal'
import { useModalComponent } from '../../../hooks/useModalComponent'
import { useState } from 'react'
import { ConfirmModal } from '../../shared/ConfirmModal'
import { BlogTypeAPI } from '../../../services/types'
import { Link } from 'react-router-dom'
import { BlogForm } from './BlogForm'
import { useAuthContext } from '../../../hooks/context/useAuthContext'
import { deleteBlog } from '../../../services/blogService'

type PropsType = {
  blog: BlogTypeAPI
  handleNewGet: () => void
}

export function BlogItem ({ blog, handleNewGet }: PropsType): JSX.Element {
  const { accessToken } = useAuthContext()
  const modalEdit = useModalComponent()
  const modalConfirm = useModalComponent()
  const [titleModalEdit, setTitleModalEdit] = useState<string>('')
  const [modalConfirmMessage, setModalConfirmMessage] = useState<string>('')

  const handleCustomOpenModal = (): void => {
    setTitleModalEdit(`Update to ${blog.title}`)
    modalEdit.handleOpenModal()
  }

  const handleOpenConfirmModalDelete = (): void => {
    setModalConfirmMessage('Do you really want to remove the record from the blog? Remember that this action has no way to be reversed.')
    modalConfirm.handleOpenModal()
  }

  const fetchDeleteItem = async (): Promise<void> => {
    await deleteBlog(accessToken, blog._id)
    handleNewGet()
  }

  return (
    <Grid xs={12} sm={12} md={12} lg={12}>
      <Box component='div'
        sx={{ bgcolor: 'white', p: 1, display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}
      >
        <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ' p': { wordBreak: 'break-word' } }}>
          <Typography component='p' variant='body1' sx={{ mb: '0.18rem', fontWeight: 'bold' }}>
            {blog.title}
          </Typography>
          <Typography component='p' variant='caption' sx={{ fontStyle: 'italic', opacity: '0.5' }}>
            {blog.path}
          </Typography>
          <Typography component='p' variant='caption' sx={{ fontStyle: 'italic', opacity: '0.5', fontSize: '0.65rem' }}>
            {blog.user != null ? `Creator: ${blog.user.firstname} ${blog.user.lastname}` : 'Creator: User Deleted'}
          </Typography>
        </Box>

        <Box
          component='div'
          sx={{ ml: 1, display: 'flex', alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Button component={Link} to={`/blog${blog.path}`} target='_blank' variant='contained' color='secondary' sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}>
            <PreviewIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
          <Button onClick={handleCustomOpenModal} variant='contained' sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}>
            <EditIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
          <Button onClick={handleOpenConfirmModalDelete} variant='contained' color='error' sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}>
            <DeleteIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
        </Box>

        <BasicModal show={modalEdit.showModal} handleClose={modalEdit.handleCloseModal} ModalTitle={titleModalEdit}>
          <BlogForm handleCloseModal={modalEdit.handleCloseModal} handleNewGet={handleNewGet} blog={blog} />
        </BasicModal>

        <ConfirmModal
          show={modalConfirm.showModal}
          handleClose={modalConfirm.handleCloseModal}
          handleConfirm={fetchDeleteItem}
          ModalTitle={`Delete to ${blog.title}`}
          ModalContent={modalConfirmMessage}
        />
      </Box>
    </Grid>
  )
}
