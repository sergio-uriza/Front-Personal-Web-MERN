import './UserAppBar.scss'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import ListIcon from '@mui/icons-material/List'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import SettingsIcon from '@mui/icons-material/Settings'
import { ProfileButton } from '../shared/ProfileButton'

type PropsType = {
  drawerWidth: number
  handleDrawerToggle: () => void
}

export function UserAppBar ({
  drawerWidth,
  handleDrawerToggle
}: PropsType): JSX.Element {
  return (
    <AppBar
      className='userappbar-header'
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <ListIcon />
        </IconButton>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
        >
          <SettingsIcon sx={{ mr: 1 }} />
          USER PANEL
        </Typography>

        <ProfileButton redirectTo='/user/auth' isInProfile={true} />
      </Toolbar>
    </AppBar>
  )
}
