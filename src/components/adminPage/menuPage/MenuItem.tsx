import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import BlockIcon from '@mui/icons-material/Block'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { BasicModal } from '../../shared/BasicModal'
import { useModalComponent } from '../../../hooks/useModalComponent'
import { useState } from 'react'
import { MenuForm } from './MenuForm'
import { ConfirmModal } from '../../shared/ConfirmModal'
import { MenuTypeAPI } from '../../../services/types'
import { deleteMenu, updateMenu } from '../../../services/menuService'
import { useAuthContext } from '../../../hooks/context/useAuthContext'

type PropsType = {
  menu: MenuTypeAPI
  handleNewGet: () => void
}

export function MenuItem ({ menu, handleNewGet }: PropsType): JSX.Element {
  const { accessToken } = useAuthContext()
  const modalEdit = useModalComponent()
  const modalConfirm = useModalComponent()
  const [titleModalEdit, setTitleModalEdit] = useState<string>('')
  const [modalConfirmMessage, setModalConfirmMessage] = useState<string>('')
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const handleCustomOpenModal = (): void => {
    setTitleModalEdit(`Update to menu: ${menu.title}`)
    modalEdit.handleOpenModal()
  }

  const handleOpenConfirmModal = (): void => {
    setIsDelete(false)
    setModalConfirmMessage(menu.active
      ? 'When you deactivate a menu, it will be hidden from the home page and nobody will be able to interact with it. This state can be changed later.'
      : 'When you activate a menu, it will be displayed on the home page and users can interact with it. This state can be changed later.'
    )
    modalConfirm.handleOpenModal()
  }

  const handleOpenConfirmModalDelete = (): void => {
    setIsDelete(true)
    setModalConfirmMessage('Do you really want to remove the record from the menu? Remember that this action has no way to be reversed.')
    modalConfirm.handleOpenModal()
  }

  const fetchToggleActive = async (): Promise<void> => {
    await updateMenu(accessToken, menu._id, { active: !menu.active })
    handleNewGet()
  }

  const fetchDeleteItem = async (): Promise<void> => {
    await deleteMenu(accessToken, menu._id)
    handleNewGet()
  }

  return (
    <Grid xs={12} sm={12} md={12} lg={6}>
      <Box component='div'
        sx={{ bgcolor: 'white', p: 1, display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}
      >
        <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ' p': { wordBreak: 'break-word' } }}>
          <Typography component='p' variant='body1' sx={{ mb: '0.18rem', fontWeight: 'bold' }}>
            {menu.title}
          </Typography>
          <Typography component='p' variant='caption' sx={{ fontStyle: 'italic', opacity: '0.5' }}>
            {menu.path}
          </Typography>
          <Typography component='p' variant='caption' sx={{ fontStyle: 'italic', opacity: '0.5', fontSize: '0.65rem' }}>
            <>{'Order: '}</><>{menu.order}</>
          </Typography>
        </Box>

        <Box
          component='div'
          sx={{ ml: 1, display: 'flex', alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Button onClick={handleCustomOpenModal} variant='contained' sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}>
            <EditIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
          <Button onClick={handleOpenConfirmModal} variant='contained' color={menu.active ? 'warning' : 'success'} sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}>
            {menu.active ? <BlockIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} /> : <DoneIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />}
          </Button>
          <Button onClick={handleOpenConfirmModalDelete} variant='contained' color='error' sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}>
            <DeleteIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
        </Box>

        <BasicModal show={modalEdit.showModal} handleClose={modalEdit.handleCloseModal} ModalTitle={titleModalEdit}>
          <MenuForm handleCloseModal={modalEdit.handleCloseModal} handleNewGet={handleNewGet} menu={menu} />
        </BasicModal>

        <ConfirmModal
          show={modalConfirm.showModal}
          handleClose={modalConfirm.handleCloseModal}
          handleConfirm={isDelete
            ? fetchDeleteItem
            : fetchToggleActive
          }
          ModalTitle={isDelete
            ? `Delete to menu: ${menu.title}`
            : (menu.active ? `Desactivate to menu: ${menu.title}` : `Activate to menu: ${menu.title}`)
          }
          ModalContent={modalConfirmMessage}
        />
      </Box>
    </Grid>
  )
}
