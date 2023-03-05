import './AdminLayout.scss'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { AdminNavBarRes } from '../../components/adminLayout/AdminNavBarRes'
import { AdminAppBar } from '../../components/adminLayout/AdminAppBar'

const drawerWidth = 190

type PropsType = {
  children?: JSX.Element
}

export function AdminLayout ({ children }: PropsType): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* HEADER SIDE */}
      <AdminAppBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* NAVBAR SIDE */}
      <AdminNavBarRes
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* CONTENT SIDE */}
      <Box
        className='adminlayout-body'
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
