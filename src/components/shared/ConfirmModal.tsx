import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Zoom from '@mui/material/Zoom'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef, useState } from 'react'
import { useFormError } from '../../hooks/useFormError'

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
  ModalContent: string
  handleConfirm: () => Promise<void>
}

export function ConfirmModal ({ show, handleClose, ModalTitle, ModalContent, handleConfirm }: PropsType): JSX.Element {
  const [isSending, setIsSending] = useState<boolean>(false)
  const { formError, handleFormError, clearFormError } = useFormError()

  const handleSendConform = (): void => {
    clearFormError()
    setIsSending(true)
    handleConfirm()
      .then(() => {
        setIsSending(false)
        handleClose()
      })
      .catch((err) => {
        handleFormError(err)
        setIsSending(false)
      })
  }

  return (
    <Dialog
      open={show}
      TransitionComponent={Transition}
      onClose={handleClose}
    >
      <DialogTitle>
        {ModalTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {ModalContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        { isSending
          ? <CircularProgress color='inherit' size='1rem' sx={{ mr: 1 }}/>
          : null
        }
        <Button onClick={handleClose} variant='contained' color='error' sx={{ textTransform: 'capitalize' }} disabled={isSending}>
          Cancel
        </Button>
        <Button onClick={handleSendConform} variant='contained' color='success' sx={{ textTransform: 'capitalize' }} disabled={isSending}>
          Confirm
        </Button>
      </DialogActions>
      <Typography component='p' sx={{ fontSize: '0.8rem', color: '#9f3a38', textAlign: 'center', my: '0.7rem' }}>
        { formError }
      </Typography>
    </Dialog>
  )
}
