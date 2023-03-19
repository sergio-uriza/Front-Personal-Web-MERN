import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login'
import PersonIcon from '@mui/icons-material/Person'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginButton (): JSX.Element {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const redirectToAuthUser = (): void => { navigate('/user/auth') }
  const redirectToAuthAdmin = (): void => { navigate('/admin/auth') }
  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = (): void => { setAnchorEl(null) }
  return (
    <>
      <Button
        onClick={handleClick}
        variant='text'
        color='info'
        size='small'
        startIcon={<LoginIcon />}
        sx={{
          border: '1px solid cornflowerblue',
          '&:hover': { opacity: '0.8 !important' }
        }}
      >
        Login
      </Button>

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
        <MenuItem onClick={redirectToAuthUser}>
          <ListItemIcon>
            <PersonIcon fontSize='small' />
          </ListItemIcon>
          User
        </MenuItem>
        <MenuItem onClick={redirectToAuthAdmin}>
          <ListItemIcon>
            <ManageAccountsIcon fontSize='small' />
          </ListItemIcon>
          Admin
        </MenuItem>
      </Menu>
    </>
  )
}
