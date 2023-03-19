import './ClientLayout.scss'
import { Outlet } from 'react-router-dom'
import { ClientAppBar } from '../../components/clientLayout/ClientAppBar'
import { ClientScrollTop } from '../../components/clientLayout/ClientScrollTop'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import { Box } from '@mui/material'
import { useState } from 'react'
import { ClientNavBarRes } from '../../components/clientLayout/ClientNavBar'
import { useGetMultipleMenu } from '../../hooks/useGetMultipleMenu'
import { ClientFooter } from '../../components/clientLayout/ClientFooter'

const drawerWidth = 190

type PropsType = {
  children?: JSX.Element
}

export function ClientLayout ({ children }: PropsType): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const { menusList } = useGetMultipleMenu(true)

  const handleDrawerToggle = (): void => { setMobileOpen((prev) => !prev) }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      className='clientlayout-body'
    >
      {/* APPBAR SIDE */}
      <CssBaseline />
      <ClientAppBar
        handleDrawerToggle={handleDrawerToggle}
        menusList={menusList}
      />

      {/* NAVBAR SIDE */}
      <ClientNavBarRes
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        menusList={menusList}
      />
      <Toolbar id='back-to-top-anchor' />

      {/* CONTENT SIDE */}
      { (children != null) ? children : <Outlet/> }

      {/* FOOTER SIDE */}
      <Box
        className='clientlayout-footer'
        component='footer'
        sx={{
          flexGrow: 1,
          px: 0,
          py: 1,
          width: '100%'
        }}
      >
        <ClientFooter />
        <ClientScrollTop idBaseElement='back-to-top-anchor' />
      </Box>
    </Box>
  )
}
