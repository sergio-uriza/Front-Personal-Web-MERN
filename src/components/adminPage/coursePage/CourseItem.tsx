import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PreviewIcon from '@mui/icons-material/Preview'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { BasicModal } from '../../shared/BasicModal'
import { SERVER_ROUTES } from '../../../services/config/constants.config'
import { useModalComponent } from '../../../hooks/useModalComponent'
import { useState } from 'react'
import { ConfirmModal } from '../../shared/ConfirmModal'
import { CourseTypeAPI } from '../../../services/types/api-res'
import { CourseForm } from './CourseForm'
import { useAuthContext } from '../../../hooks/context/useAuthContext'
import { deleteCourse } from '../../../services/courseService'
import { useSnackbar } from 'notistack'

type PropsType = {
  course: CourseTypeAPI
  handleNewGet: () => void
}

export function CourseItem ({ course, handleNewGet }: PropsType): JSX.Element {
  const { accessToken } = useAuthContext()
  const modalEdit = useModalComponent()
  const modalConfirm = useModalComponent()
  const [titleModalEdit, setTitleModalEdit] = useState<string>('')
  const [modalConfirmMessage, setModalConfirmMessage] = useState<string>('')
  const { enqueueSnackbar } = useSnackbar()

  const handleCustomOpenModal = (): void => {
    setTitleModalEdit('Update Course')
    modalEdit.handleOpenModal()
  }

  const handleOpenConfirmModalDelete = (): void => {
    setModalConfirmMessage(
      'Do you really want to remove the record from the course? Remember that this action has no way to be reversed.'
    )
    modalConfirm.handleOpenModal()
  }

  const fetchDeleteItem = async (): Promise<void> => {
    await deleteCourse(accessToken, course._id)
    enqueueSnackbar('Course Deleted', { variant: 'success' })
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
            alt='COURSE'
            src={course.miniature != null ? `${SERVER_ROUTES.BASE_PATH}/${course.miniature}` : ''}
            sx={{
              my: 1,
              mr: 2,
              width: { xs: '3.7rem', sm: '5rem', md: '8rem' },
              MinWidth: 60,
              aspectRatio: '1.7/1',
              height: 'auto',
              fontSize: '28px'
            }}
            imgProps={{ loading: 'lazy' }}
          />
          <Box component='div' sx={{ '& p': { wordBreak: 'break-word' } }}>
            <Typography
              component='p'
              variant='body1'
              sx={{
                mb: 1,
                fontWeight: 'bold',
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
                fontStyle: 'italic',
                opacity: '0.5',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: '1'
              }}
            >
              {course.url}
            </Typography>
            <Typography
              component='p'
              variant='caption'
              sx={{ fontStyle: 'italic', opacity: '0.5', fontSize: '0.65rem' }}
            >
              {`Score: ${course.score}`}
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
            component='a'
            href={course.url}
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
            variant='contained'
            color='error'
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
          <CourseForm
            handleCloseModal={modalEdit.handleCloseModal}
            handleNewGet={handleNewGet}
            course={course} />
        </BasicModal>

        <ConfirmModal
          show={modalConfirm.showModal}
          handleClose={modalConfirm.handleCloseModal}
          handleConfirm={fetchDeleteItem}
          ModalTitle={'Delete Course'}
          ModalContent={modalConfirmMessage}
        />
      </Box>
    </Grid>
  )
}
