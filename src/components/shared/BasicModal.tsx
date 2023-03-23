import './BasicModal.scss'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import BackspaceIcon from '@mui/icons-material/Backspace'
import Dialog from '@mui/material/Dialog'
import Zoom from '@mui/material/Zoom'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef } from 'react'

const Transition = forwardRef(function Transition (
  props: TransitionProps & { children: JSX.Element },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />
})

type PropsType = {
  show: boolean
  handleClose: () => void
  ModalTitle: string
  ClassName?: string
  children?: JSX.Element
}

export function BasicModal ({
  show,
  handleClose,
  ModalTitle,
  ClassName,
  children
}: PropsType): JSX.Element {
  return (
    <Dialog
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
      transitionDuration={{
        enter: 450,
        exit: 300
      }}
      disableEnforceFocus
    >
      <Box component='div' className='basicmodal-main'>
        <Typography
          variant='h6'
          component='h3'
          sx={{
            px: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {ModalTitle}
          <IconButton size='small' color='error' onClick={handleClose}>
            <BackspaceIcon fontSize='small' />
          </IconButton>
        </Typography>
        <Divider sx={{ mx: 2 }} />
        <Typography variant='body1' component='div' sx={{ mt: 2 }} className={ClassName}>
          {children != null ? children : 'No Content'}
        </Typography>
      </Box>
    </Dialog>
  )
}
