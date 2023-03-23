import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

type PropsType = {
  open: boolean
}

export function BackdropLoading ({ open }: PropsType): JSX.Element {
  return (
    <Backdrop
      sx={{ color: '#fff' }}
      open={open}
      transitionDuration={1900}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}
