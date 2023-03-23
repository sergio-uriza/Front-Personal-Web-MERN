import './ClientNavBar.scss'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { Link, useLocation } from 'react-router-dom'
import { ClientSocialMedia } from './ClientSocialMedia'
import { useGetMultipleMenu } from '../../hooks/useGetMultipleMenu'

type PropsType = {
  drawerWidth: number
  mobileOpen: boolean
  handleDrawerToggle: () => void
}

export function ClientNavBarRes ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle
}: PropsType): JSX.Element {
  const { menusList } = useGetMultipleMenu(true)
  const { pathname } = useLocation()

  return (
    <Box component='nav'>
      <Drawer
        className='clientnavbar-temporary'
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
        {/* ELEMENTS LIST */}
        <>
          <Toolbar className='clientnavbar-toolbar'>
            <Typography variant='h6' noWrap component='span'>
              Menu Options
            </Typography>
          </Toolbar>

          <Divider sx={{ borderColor: 'gray' }} />

          <List className='clientnavbar-list'>
            {menusList != null
              ? menusList.map((menuList) => {
                if (menuList.path.startsWith('/')) {
                  return (
                    <ListItemButton
                      key={menuList._id}
                      component={Link}
                      to={menuList.path}
                      selected={pathname === menuList.path}
                      className='int-link'
                    >
                      <ListItemText primary={menuList.title} />
                    </ListItemButton>
                  )
                } else {
                  return (
                    <ListItemButton
                      key={menuList._id}
                      component='a'
                      href={menuList.path}
                      target='_blank'
                      selected={false}
                      className='ext-link'
                    >
                      <ListItemText primary={menuList.title} />
                    </ListItemButton>
                  )
                }
              })
              : null
            }
          </List>

          <Divider sx={{ borderColor: 'gray' }} />

          <ClientSocialMedia className='clientnavbar-social' />
        </>
      </Drawer>
    </Box>
  )
}
