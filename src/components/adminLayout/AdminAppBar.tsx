import './AdminAppBar.scss'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import ListIcon from '@mui/icons-material/List'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { ButtonLogout } from '../logout/ButtonLogout'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

type PropsType = {
  drawerWidth: number
  handleDrawerToggle: () => void
}

export function AdminAppBar ({
  drawerWidth,
  handleDrawerToggle
}: PropsType): JSX.Element {
  return (
    <AppBar
      className="adminappbar-header"
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <ListIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
        >
          <AdminPanelSettingsIcon sx={{ mr: 1 }} />
          ADMIN PANEL
        </Typography>

        <ButtonLogout redirectTo="/admin/auth" />
      </Toolbar>
    </AppBar>
  )
}
