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
        <Box sx={{ py: 2, gap: '8px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          {children}
        </Box>
      )}
    </div>
  )
}
