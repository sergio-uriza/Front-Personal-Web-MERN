import './AdminMenuList.scss'
import { IconMERN } from '../../assets/svg/IconMERN'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import GroupIcon from '@mui/icons-material/Group'
import MenuIcon from '@mui/icons-material/Menu'
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook'
import ChatIcon from '@mui/icons-material/Chat'
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread'
import { Link, useLocation } from 'react-router-dom'

export function AdminMenuList (): JSX.Element {
  const { pathname } = useLocation()

  return (
    <>
      <Toolbar className='adminmenu-toolbar'>
        <IconMERN className='logo' />
      </Toolbar>

      <Divider sx={{ borderColor: 'gray' }} />

      <List className='adminmenu-list'>
        <ListItemButton
          component={Link}
          to='/admin/users'
          selected={pathname === '/admin/users'}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary='Users' />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to='/admin/menu'
          selected={pathname === '/admin/menu'}
        >
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary='Menu' />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to='/admin/courses'
          selected={pathname === '/admin/courses'}
        >
          <ListItemIcon>
            <LaptopChromebookIcon />
          </ListItemIcon>
          <ListItemText primary='Courses' />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to='/admin/blog'
          selected={pathname === '/admin/blog'}
        >
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary='Blog' />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to='/admin/newsletter'
          selected={pathname === '/admin/newsletter'}
        >
          <ListItemIcon>
            <MarkEmailUnreadIcon />
          </ListItemIcon>
          <ListItemText primary='Newsletter' />
        </ListItemButton>
      </List>
    </>
  )
}
