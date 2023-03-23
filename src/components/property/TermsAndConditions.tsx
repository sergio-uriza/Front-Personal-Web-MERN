import './TermsAndConditions.scss'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import Dialog from '@mui/material/Dialog'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef } from 'react'
import { AllTermsText } from './AllTermsText'
import { AllPrivacyText } from './AllPrivacyText'

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
      className='termsandconditions-main'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiDialog-container.MuiDialog-scrollBody::-webkit-scrollbar': { display: 'none' }
      }}
      open={show}
      TransitionComponent={Transition}
      onClose={handleClose}
      scroll='body'
      disableEnforceFocus
    >
      <Box className='termsandconditions-body'>
        <Typography variant='h6' component='h2'>
          Terminos y Condiciones de la Pagina
        </Typography>
        <Typography component='div' sx={{ mt: 2 }}>
          <AllTermsText />
        </Typography>
        <Typography variant='h6' component='h2' sx={{ mt: 3 }}>
          Politica de Privacidad
        </Typography>
        <Typography component='div' sx={{ mt: 2 }}>
          <AllPrivacyText />
        </Typography>
      </Box>
    </Dialog>
  )
}
