import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import NoAccountsIcon from '@mui/icons-material/NoAccounts'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { BasicModal } from '../../shared/BasicModal'
import { SERVER_ROUTES } from '../../../services/config/routes.config'
import { useModalComponent } from '../../../hooks/useModalComponent'
import { useState } from 'react'
import { UserForm } from './UserForm'
import { ConfirmModal } from '../../shared/ConfirmModal'
import { UserTypeAPI } from '../../../services/types/api-res'
import { useAuthContext } from '../../../hooks/context/useAuthContext'
import { deleteUser, updateUser } from '../../../services/userService'
import { DateTime } from 'luxon'
import { useSnackbar } from 'notistack'

type PropsType = {
  user: UserTypeAPI
  handleNewGet: () => void
}

export function UserItem ({ user, handleNewGet }: PropsType): JSX.Element {
  const { loggedUser } = useAuthContext()
  const modalEdit = useModalComponent()
  const modalConfirm = useModalComponent()
  const [titleModalEdit, setTitleModalEdit] = useState<string>('')
  const [modalConfirmMessage, setModalConfirmMessage] = useState<string>('')
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const { enqueueSnackbar } = useSnackbar()
  const date = new Date(user.updatedAt)

  const handleCustomOpenModal = (): void => {
    setTitleModalEdit('Update User')
    modalEdit.handleOpenModal()
  }

  const handleOpenConfirmModal = (): void => {
    setIsDelete(false)
    setModalConfirmMessage(user.active
      ? 'When you deactivate an user, they will no longer be able to log into the application. This state can be changed later.'
      : 'When you activate an user, they will be able to log in and interact in the application. This state can be changed later.'
    )
    modalConfirm.handleOpenModal()
  }

  const handleOpenConfirmModalDelete = (): void => {
    setIsDelete(true)
    setModalConfirmMessage(
      'Do you really want to delete the user record? Remember that this action has no way to be reversed.'
    )
    modalConfirm.handleOpenModal()
  }

  const fetchToggleActive = async (): Promise<void> => {
    await updateUser(user._id, { active: !user.active })
    enqueueSnackbar(
      user.active ? 'User Deactivated' : 'User Activated',
      { variant: user.active ? 'warning' : 'success' }
    )
    handleNewGet()
  }

  const fetchDeleteItem = async (): Promise<void> => {
    await deleteUser(user._id)
    enqueueSnackbar('User Deleted', { variant: 'success' })
    handleNewGet()
  }

  return (
    <Grid xs={12} sm={12} md={12} lg={6}>
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
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Avatar
            src={user.avatar != null
              ? `${SERVER_ROUTES.BASE_PATH}/${user.avatar}`
              : undefined
            }
            sx={{
              my: 1,
              mr: 2,
              width: { xs: '2.8rem', sm: '4.1rem', md: '5.5rem' },
              MinWidth: 45,
              aspectRatio: '1/1',
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
                WebkitLineClamp: '1'
              }}
            >
              {user.firstname} {user.lastname}
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
                WebkitLineClamp: '3'
              }}
            >
              {user.email}
            </Typography>
            <Typography
              component='p'
              variant='caption'
              sx={{ fontStyle: 'italic', opacity: '0.5', fontSize: '0.65rem' }}
            >
              {DateTime.fromISO(date.toISOString()).setLocale('es').toFormat('\'Updated:\' LLL dd\',\' yyyy')}
            </Typography>
            <Typography
              component='p'
              variant='caption'
              sx={{ fontStyle: 'italic', opacity: '0.5', fontSize: '0.65rem' }}
            >
              {`(${String(user.role)})`}
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
            onClick={handleCustomOpenModal}
            variant='contained'
            sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}
            disabled={loggedUser != null && loggedUser.email === user.email}
          >
            <EditIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
          <Button
            onClick={handleOpenConfirmModal}
            variant='contained'
            color={user.active ? 'warning' : 'success'}
            sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}
            disabled={loggedUser != null && loggedUser.email === user.email && user.active}
          >
            {user.active
              ? <NoAccountsIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
              : <VerifiedUserIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
            }
          </Button>
          <Button
            onClick={handleOpenConfirmModalDelete}
            variant='contained'
            color='error'
            sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}
            disabled={loggedUser != null && loggedUser.email === user.email}
          >
            <DeleteIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
        </Box>

        <BasicModal
          show={modalEdit.showModal}
          handleClose={modalEdit.handleCloseModal}
          ModalTitle={titleModalEdit}
        >
          <UserForm
            handleCloseModal={modalEdit.handleCloseModal}
            handleNewGet={handleNewGet}
            user={user}
          />
        </BasicModal>

        <ConfirmModal
          show={modalConfirm.showModal}
          handleClose={modalConfirm.handleCloseModal}
          handleConfirm={isDelete
            ? fetchDeleteItem
            : fetchToggleActive
          }
          ModalTitle={isDelete
            ? 'Delete User'
            : (user.active ? 'Deactivate User' : 'Activate User')
          }
          ModalContent={modalConfirmMessage}
        />
      </Box>
    </Grid>
  )
}
