import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PreviewIcon from '@mui/icons-material/Preview'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import Avatar from '@mui/material/Avatar'
import { BasicModal } from '../../shared/BasicModal'
import { useModalComponent } from '../../../hooks/useModalComponent'
import { useState } from 'react'
import { ConfirmModal } from '../../shared/ConfirmModal'
import { GetMyBlogType } from '../../../services/types/api-res'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import { SERVER_ROUTES } from '../../../services/config/routes.config'
import { MyBlogForm } from './MyBlogForm'
import { deleteMyBlog } from '../../../services/blogService'

type PropsType = {
  myBlog: GetMyBlogType
  handleNewGet: () => void
}

export function MyBlogItem ({ myBlog, handleNewGet }: PropsType): JSX.Element {
  const modalEdit = useModalComponent()
  const modalConfirm = useModalComponent()
  const [titleModalEdit, setTitleModalEdit] = useState<string>('')
  const [modalConfirmMessage, setModalConfirmMessage] = useState<string>('')
  const date = new Date(myBlog.createdAt)

  const handleCustomOpenModal = (): void => {
    setTitleModalEdit(`Update to ${myBlog.title}`)
    modalEdit.handleOpenModal()
  }

  const handleOpenConfirmModalDelete = (): void => {
    setModalConfirmMessage(
      'Do you really want to remove the record from the blog? Remember that this action has no way to be reversed.'
    )
    modalConfirm.handleOpenModal()
  }

  const fetchDeleteItem = async (): Promise<void> => {
    await deleteMyBlog(myBlog._id)
    handleNewGet()
  }

  return (
    <Grid xs={12} sm={12} md={12} lg={12}>
      <Box
        component='div'
        sx={{
          bgcolor: 'white',
          p: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center'
        }}
      >
        <Box
          component='div'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
        >
          <Avatar
            variant='rounded'
            alt='BLOG'
            src={myBlog.miniature != null
              ? `${SERVER_ROUTES.BASE_PATH}/${myBlog.miniature}`
              : undefined
            }
            sx={{
              display: { xs: 'none', sm: 'flex' },
              my: 1,
              mr: 2,
              width: { xs: '3.7rem', sm: '4.5rem', md: '8rem' },
              MinWidth: 60,
              aspectRatio: '1.7/1',
              height: 'auto',
              fontSize: '28px'
            }}
          />
          <Box
            component='div'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              '& p': { wordBreak: 'break-word' }
            }}
          >
            <Typography
              component='p'
              variant='body1'
              sx={{ mb: '0.18rem', fontWeight: 'bold' }}
            >
              {myBlog.title}
            </Typography>
            <Typography
              component='p'
              variant='caption'
              sx={{ fontStyle: 'italic', opacity: '0.5' }}
            >
              {myBlog.path}
            </Typography>
            <Typography
              component='p'
              variant='caption'
              sx={{ fontStyle: 'italic', opacity: '0.5', fontSize: '0.65rem' }}
            >
              {DateTime.fromISO(date.toISOString()).setLocale('es').toFormat('\'Created:\' LLL dd\',\' yyyy')}
            </Typography>
          </Box>
        </Box>

        <Box
          component='div'
          sx={{
            ml: 1,
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Button
            component={Link}
            to={`/blog${myBlog.path}`}
            target='_blank'
            variant='contained'
            color='secondary'
            sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}
          >
            <PreviewIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
          <Button
            onClick={handleCustomOpenModal}
            variant='contained'
            sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}
          >
            <EditIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
          <Button
            onClick={handleOpenConfirmModalDelete}
            variant='contained' color='error'
            sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}
          >
            <DeleteIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
        </Box>

        <BasicModal
          show={modalEdit.showModal}
          handleClose={modalEdit.handleCloseModal}
          ModalTitle={titleModalEdit}
        >
          <MyBlogForm
            handleCloseModal={modalEdit.handleCloseModal}
            handleNewGet={handleNewGet}
            myBlog={myBlog}
          />
        </BasicModal>

        <ConfirmModal
          show={modalConfirm.showModal}
          handleClose={modalConfirm.handleCloseModal}
          handleConfirm={fetchDeleteItem}
          ModalTitle={`Delete to ${myBlog.title}`}
          ModalContent={modalConfirmMessage}
        />
      </Box>
    </Grid>
  )
}
