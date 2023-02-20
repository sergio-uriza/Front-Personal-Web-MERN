import './AuthAdminPage.scss'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useState } from 'react'
import TabPanel from '../../components/TabPanel'
import RegisterForm from '../../components/forms/RegisterForm'
import LoginForm from '../../components/forms/LoginForm'

export default function AuthAdminPage (): JSX.Element {
  const [value, setValue] = useState<number>(0)

  const handleChange = (e: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  const setToLogin = (): void => { setValue(0) }

  return (
    <div className='authadminpage-page'>
      <Container maxWidth="sm">
        <Box className='box-panel' >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="primary tabs" >
              <Tab className='tab' label="Sign in" />
              <Tab className='tab' label="Sign up" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <LoginForm />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RegisterForm setToLogin={setToLogin} />
          </TabPanel>
        </Box>
      </Container>
    </div>
  )
}
