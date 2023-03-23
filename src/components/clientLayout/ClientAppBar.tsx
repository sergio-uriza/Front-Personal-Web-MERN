import './ClientAppBar.scss'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import { ProfileButton } from '../shared/ProfileButton'
import { useAuthContext } from '../../hooks/context/useAuthContext'
import { IconMERN } from '../../assets/svg/IconMERN'
import { Link } from 'react-router-dom'
import { ClientSocialMedia } from './ClientSocialMedia'
import { LoginButton } from '../shared/LoginButton'
import { useGetMultipleMenu } from '../../hooks/useGetMultipleMenu'

type PropsType = {
  handleDrawerToggle: () => void
}

export function ClientAppBar ({ handleDrawerToggle }: PropsType): JSX.Element {
  const { loggedUser } = useAuthContext()
  const { menusList } = useGetMultipleMenu(true)

  return (
    <AppBar component='nav' className='clientappbar-header'>
      <Toolbar>
        <Container maxWidth='md' sx={{ px: '5px', display: 'flex', alignItems: 'center' }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='subtitle2'
            noWrap
            component='div'
            sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
          >
            <Link to='/' style={{ color: 'white', textDecoration: 'none', marginRight: '8px' }}>
              <IconMERN className='logo' />
            </Link>
            {menusList != null
              ? menusList.map((menuList) => {
                if (menuList.path.startsWith('/')) {
                  return (
                    <Link key={menuList._id} to={menuList.path} className='menu-item'>
                      {menuList.title}
                    </Link>
                  )
                } else {
                  return (
                    <a
                      key={menuList._id}
                      href={menuList.path}
                      target='_blank'
                      className='menu-item menu-item-ext'
                      rel='noreferrer'
                    >
                      {menuList.title}
                    </a>
                  )
                }
              })
              : null
            }
          </Typography>

          {/* SOCIAL NETWORKS */}
          <ClientSocialMedia className='clientappbar-social'/>

          {loggedUser != null
            ? <ProfileButton redirectTo='/' />
            : <LoginButton />
          }
        </Container>
      </Toolbar>
    </AppBar>
  )
}
