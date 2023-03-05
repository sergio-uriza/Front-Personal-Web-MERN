import Box from '@mui/material/Box'

type PropsType = {
  children?: JSX.Element
  index: number
  value: number
}

export function TabPanel ({ children, value, index }: PropsType): JSX.Element {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  )
}
