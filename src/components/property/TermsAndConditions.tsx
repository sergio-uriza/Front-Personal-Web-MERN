import './TermsAndConditions.scss'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import Dialog from '@mui/material/Dialog'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef } from 'react'

const Transition = forwardRef(function Transition (
  props: TransitionProps & { children: JSX.Element },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

type PropsType = {
  show: boolean
  handleClose: () => void
}

export function TermsAndConditions ({ show, handleClose }: PropsType): JSX.Element {
  return (
    <Dialog
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      open={show}
      TransitionComponent={Transition}
      onClose={handleClose}
      scroll='body'
    >
      <Box className='termsandconditions-body'>
        <Typography id='transition-modal-title' variant='h6' component='h2'>
          Terms and conditions of the service
        </Typography>
        <Typography id='transition-modal-description' sx={{ mt: 2 }}>
          Reglas de la pagina
        </Typography>
      </Box>
    </Dialog>
  )
}
