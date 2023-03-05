import './UserLayout.scss'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { UserAppBar } from '../../components/userLayout/UserAppBar'
import { UserNavBarRes } from '../../components/userLayout/UserNavBarRes'

const drawerWidth = 190

type PropsType = {
  children?: JSX.Element
}

export function UserLayout ({ children }: PropsType): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* HEADER SIDE */}
      <UserAppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* NAVBAR SIDE */}
      <UserNavBarRes
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* CONTENT SIDE */}
      <Box
        className='userlayout-body'
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Typography component='div'>
          {children != null ? children : <Outlet />}
        </Typography>
      </Box>
    </Box>
  )
}
