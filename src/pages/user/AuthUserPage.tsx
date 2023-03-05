import './AuthUserPage.scss'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useState } from 'react'
import { TabPanel } from '../../components/loading/TabPanel'
import { RegisterForm } from '../../components/forms/RegisterForm'
import { LoginForm } from '../../components/forms/LoginForm'
import { loginUserAuth } from '../../services/authService'
import { IconMERN } from '../../assets/svg/IconMERN'

export function AuthUserPage (): JSX.Element {
  const [value, setValue] = useState<number>(0)

  const handleChange = (e: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  const setToLogin = (): void => { setValue(0) }

  return (
    <div className='authuserpage-page'>
      <Container maxWidth='sm'>
        <IconMERN className='logo'/>
        <Box className='box-panel' >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='primary tabs' >
              <Tab className='tab' label='Sign in' />
              <Tab className='tab' label='Sign up' />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <LoginForm fetchLogin={loginUserAuth} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RegisterForm setToLogin={setToLogin} />
          </TabPanel>
        </Box>
      </Container>
    </div>
  )
}
