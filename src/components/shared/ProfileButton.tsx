import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import HomeIcon from '@mui/icons-material/Home'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/context/useAuthContext'
import { SERVER_ROUTES } from '../../services/config/constants.config'
import { UserRole } from '../../enums/userRole.enum'
import { useNavigate } from 'react-router-dom'

type PropsType = {
  redirectTo?: string
  isInProfile?: boolean
}

export function ProfileButton ({
  redirectTo = '/',
  isInProfile = false
}: PropsType): JSX.Element {
  const { logoutAuthHandler } = useAuthContext()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { loggedUser } = useAuthContext()
  const open = Boolean(anchorEl)

  const redirectToProfile = (): void => {
    if (loggedUser != null && loggedUser.role === UserRole.ADMIN) navigate('/admin')
    if (loggedUser != null && loggedUser.role === UserRole.USER) navigate('/me/profile')
  }
  const redirectToBlog = (): void => { navigate('/me/blog') }
  const redirectToHome = (): void => { navigate('/') }
  const handleLogout = (): void => {
    setAnchorEl(null)
    logoutAuthHandler()
    navigate(redirectTo)
  }
  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = (): void => { setAnchorEl(null) }
  return (
    <>
      <Tooltip title='logged in session' placement='bottom-end' arrow>
        <Chip
          avatar={
            <Avatar
              src={loggedUser?.avatar != null
                ? `${SERVER_ROUTES.BASE_PATH}/${loggedUser.avatar}`
                : ''
              }
            />
          }
          label={loggedUser != null
            ? (loggedUser.role === UserRole.ADMIN ? 'Admin' : 'User')
            : '???'
          }
          variant='outlined'
          onClick={handleClick}
          sx={{ color: 'white' }}
        />
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isInProfile
          ? <MenuItem onClick={redirectToHome}>
              <ListItemIcon>
                <HomeIcon fontSize='small' />
              </ListItemIcon>
              Home
            </MenuItem>
          : <MenuItem onClick={redirectToProfile}>
              <ListItemIcon>
                <Settings fontSize='small' />
              </ListItemIcon>
              {loggedUser != null && loggedUser.role === UserRole.ADMIN ? 'Manage' : 'My Profile'}
            </MenuItem>
        }
        {loggedUser != null && loggedUser.role === UserRole.USER && !isInProfile
          ? <MenuItem onClick={redirectToBlog}>
              <ListItemIcon>
                <CoPresentIcon fontSize='small' />
              </ListItemIcon>
              My Blogs
            </MenuItem>
          : null
        }
        <MenuItem onClick={handleLogout} sx={{ color: 'purple' }}>
          <ListItemIcon>
            <Logout fontSize='small' color='secondary' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
