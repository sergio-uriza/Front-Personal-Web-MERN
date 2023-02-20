import Box from '@mui/material/Box'

interface Props {
  children?: JSX.Element
  index: number
  value: number
}

export default function TabPanel ({ children, value, index }: Props): JSX.Element {
  return (
    <div
      role="tabpanel"
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
