import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useState } from 'react'
import { ConfirmModal } from '../../shared/ConfirmModal'
import { useModalComponent } from '../../../hooks/useModalComponent'
import { NewsletterTypeAPI } from '../../../services/types/api-res'
import { useAuthContext } from '../../../hooks/context/useAuthContext'
import { deleteNewsletter } from '../../../services/newsletterService'

type PropsType = {
  newsletter: NewsletterTypeAPI
  handleNewGet: () => void
}

export function NewsletterItem ({ newsletter, handleNewGet }: PropsType): JSX.Element {
  const { accessToken } = useAuthContext()
  const modalConfirm = useModalComponent()
  const [modalConfirmMessage, setModalConfirmMessage] = useState<string>('')

  const handleOpenConfirmModalDelete = (): void => {
    setModalConfirmMessage(
      'Do you really want to remove the email contact from this subscriber? Remember that this action has no way to be reversed.'
    )
    modalConfirm.handleOpenModal()
  }

  const fetchDeleteItem = async (): Promise<void> => {
    await deleteNewsletter(accessToken, newsletter._id)
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
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            ' p': { wordBreak: 'break-word' }
          }}
        >
          <Typography
            component='p'
            variant='body1'
            sx={{
              mb: '0.18rem',
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '2'
            }}
          >
            {newsletter.email}
          </Typography>
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
            onClick={handleOpenConfirmModalDelete}
            variant='contained'
            color='error'
            sx={{ minWidth: '0.6rem', p: { xs: '6px', sm: 1 }, m: '0.13rem' }}
          >
            <DeleteIcon sx={{ fontSize: { xs: '0.8rem', sm: '1.1rem' } }} />
          </Button>
        </Box>

        <ConfirmModal
          show={modalConfirm.showModal}
          handleClose={modalConfirm.handleCloseModal}
          handleConfirm={fetchDeleteItem}
          ModalTitle={'Delete Email Adress'}
          ModalContent={modalConfirmMessage}
        />
      </Box>
    </Grid>
  )
}
