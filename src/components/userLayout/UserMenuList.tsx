import './UserMenuList.scss'
import { IconMERN } from '../../assets/svg/IconMERN'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PersonIcon from '@mui/icons-material/Person'
import InsertCommentIcon from '@mui/icons-material/InsertComment'
import { Link, useLocation } from 'react-router-dom'

export function UserMenuList (): JSX.Element {
  const { pathname } = useLocation()

  return (
    <>
      <Toolbar className='usermenu-toolbar'>
        <IconMERN className='logo' />
      </Toolbar>

      <Divider sx={{ borderColor: 'gray' }} />

      <List className='usermenu-list'>
        <ListItemButton
          component={Link}
          to='/me/profile'
          selected={pathname === '/me/profile'}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary='My Profile' />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to='/me/blog'
          selected={pathname === '/me/blog'}
        >
          <ListItemIcon>
            <InsertCommentIcon />
          </ListItemIcon>
          <ListItemText primary='My Blogs' />
        </ListItemButton>
      </List>
    </>
  )
}
