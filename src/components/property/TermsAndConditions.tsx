import './TermsAndConditions.scss'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'

export function TermsAndConditions (): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = (): void => { setOpen(true) }
  const handleClose = (): void => { setOpen(false) }

  return (
    <>
      <Link variant='body2' onClick={handleOpen} sx={{ fontStyle: 'italic', '&:hover': { cursor: 'pointer' } }}>
        ⓘ Terms of service and privacy policy
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300 }}
      >
        <Fade in={open}>
          <Box className='termsandconditions-body'>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Terms and conditions of the service
            </Typography>
            <Typography id='transition-modal-description' sx={{ mt: 2 }}>
              Reglas de la pagina
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
