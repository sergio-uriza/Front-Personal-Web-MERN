import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Fab from '@mui/material/Fab'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

type PropsType = {
  baseElementRef: React.RefObject<HTMLDivElement>
}

export function ClientScrollTop ({ baseElementRef }: PropsType): JSX.Element {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  })

  const handleClick = (_e: React.MouseEvent<HTMLDivElement>): void => {
    const anchor = baseElementRef.current

    if (anchor != null) {
      anchor.scrollIntoView({ block: 'center' })
    }
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Fab
          size='small'
          aria-label='scroll back to top'
          sx={{ opacity: '0.25' }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  )
}
