import './UserNavBarRes.scss'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import { UserMenuList } from './UserMenuList'

type PropsType = {
  drawerWidth: number
  mobileOpen: boolean
  handleDrawerToggle: () => void
  window?: () => Window
}

export function UserNavBarRes ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
  window
}: PropsType): JSX.Element {
  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label='mailbox folders'
    >
      <Drawer
        className='usernavbarres-temporary'
        container={container}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <UserMenuList />
      </Drawer>
      <Drawer
        className='usernavbarres-permanent'
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        open
      >
        <UserMenuList />
      </Drawer>
    </Box>
  )
}
