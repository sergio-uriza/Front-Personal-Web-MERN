import { GetMultipleUserType } from '../../../services/types'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import BlockIcon from '@mui/icons-material/Block'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import { BasicModal } from '../../shared/BasicModal'
import { SERVER_ROUTES } from '../../../services/config/constants.config'
import { useModalComponent } from '../../../hooks/useModalComponent'
import { useState } from 'react'
import { UserForm } from './UserForm'
import { ConfirmModal } from '../../shared/ConfirmModal'
import { useAuthContext } from '../../../hooks/context/useAuthContext'
import { deleteUser, updateUser } from '../../../services/userService'

type PropsType = {
  user: GetMultipleUserType
  handleNewGet: () => void
}

export function UserItem ({ user, handleNewGet }: PropsType): JSX.Element {
  const { accessToken } = useAuthContext()
  const modalEdit = useModalComponent()
  const modalConfirm = useModalComponent()
  const [titleModalEdit, setTitleModalEdit] = useState<string>('')
  const [modalConfirmMessage, setModalConfirmMessage] = useState<string>('')
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const handleCustomOpenModal = (): void => {
    setTitleModalEdit(`Update to ${user.email}`)
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
    setModalConfirmMessage('Do you really want to delete the user record? Remember that this action has no way to be reversed.')
    modalConfirm.handleOpenModal()
  }

  const fetchToggleActive = async (): Promise<void> => {
    await updateUser(accessToken, user._id, { active: !user.active })
    handleNewGet()
  }

  const fetchDeleteItem = async (): Promise<void> => {
    await deleteUser(accessToken, user._id)
    handleNewGet()
  }

  return (
    <>
      <Box component='div'
        sx={{ width: '100%', maxWidth: '510px', bgcolor: 'white', p: 1, display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}
      >
        <Box
          component='div'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Avatar
            src={user.avatar != null ? `${SERVER_ROUTES.BASE_PATH}/${user.avatar}` : ''}
            sx={{ my: 1, mr: 2, width: 40, height: 40 }}
          />
          <Box component='div'>
            <Typography component='p' variant='body1' sx={{ mb: 1, fontWeight: 'bold' }}>
              {user.firstname} {user.lastname}
            </Typography>
            <Typography component='p' variant='caption' sx={{ fontStyle: 'italic', opacity: '0.5' }}>
              {user.email}
            </Typography>
            <Typography component='p' variant='caption' sx={{ fontStyle: 'italic', opacity: '0.5', fontSize: '0.65rem' }}>
              <>{'('}</><>{user.role}</><>{')'}</>
            </Typography>
          </Box>
        </Box>

        <Box
          component='div'
          sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Button onClick={handleCustomOpenModal} variant='contained' sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}>
            <EditIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
          <Button onClick={handleOpenConfirmModal} variant='contained' color={user.active ? 'warning' : 'success'} sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}>
            {user.active ? <BlockIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} /> : <DoneIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />}
          </Button>
          <Button onClick={handleOpenConfirmModalDelete} variant='contained' color='error' sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}>
            <DeleteIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
        </Box>

        <BasicModal show={modalEdit.showModal} handleClose={modalEdit.handleCloseModal} ModalTitle={titleModalEdit}>
          <UserForm handleCloseModal={modalEdit.handleCloseModal} handleNewGet={handleNewGet} user={user} />
        </BasicModal>

        <ConfirmModal
          show={modalConfirm.showModal}
          handleClose={modalConfirm.handleCloseModal}
          handleConfirm={isDelete
            ? fetchDeleteItem
            : fetchToggleActive
          }
          ModalTitle={isDelete
            ? `Delete to ${user.email}`
            : (user.active ? `Desactivate to ${user.email}` : `Activate to ${user.email}`)
          }
          ModalContent={modalConfirmMessage}
        />
      </Box>
    </>
  )
}
