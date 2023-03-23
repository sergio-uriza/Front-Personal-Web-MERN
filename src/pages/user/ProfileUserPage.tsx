import './ProfileUserPage.scss'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Button from '@mui/material/Button'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import { TabPanel } from '../../components/shared/TabPanel'
import { ProfileForm } from '../../components/userPage/profilePage/ProfileForm'
import { useAuthContext } from '../../hooks/context/useAuthContext'
import { ConfirmModal } from '../../components/shared/ConfirmModal'
import { useModalComponent } from '../../hooks/useModalComponent'
import { updateMyUser } from '../../services/userService'
import { useSnackbar } from 'notistack'

export function ProfileUserPage (): JSX.Element {
  const { loggedUser, logoutAuthHandler } = useAuthContext()
  const { accessToken } = useAuthContext()
  const { showModal, handleCloseModal, handleOpenModal } = useModalComponent()
  const { enqueueSnackbar } = useSnackbar()

  const fetchDesactiveMeUser = async (): Promise<void> => {
    await updateMyUser(accessToken, { active: false })
    enqueueSnackbar('Account Deactivated', { variant: 'warning' })
    logoutAuthHandler()
  }

  return (
    <>
      <Box component='div' sx={{ position: 'relative' }}>
        <Button
          className='profileuserpage-modalbutton'
          variant='contained'
          color='warning'
          onClick={handleOpenModal}
        >
          Delete my account
        </Button>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={false}
            variant='scrollable'
            scrollButtons='auto'
            textColor='secondary'
            indicatorColor='secondary'
            sx={{ span: { opacity: '0' } }}
          >
            <Tab
              className='profileuserpage-tab'
              label='All'
              icon={<DoneAllIcon />}
              sx={{ opacity: '0', cursor: 'default', textTransform: 'capitalize' }}
            />
          </Tabs>
        </Box>
        <TabPanel value={0} index={0}>
          <Box
            sx={{
              maxWidth: '630px',
              height: 'calc(100vh - 12.1rem)',
              mx: 'auto',
              overflowY: 'scroll',
              alignContent: 'center',
              '&::-webkit-scrollbar': { display: 'none' }
            }}
          >
            {loggedUser == null
              ? <span
                  style={{
                    margin: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  No Data
                  <StopScreenShareIcon fontSize='medium' sx={{ pl: 1 }} />
                </span>
              : <ProfileForm myUser={loggedUser} />
            }
          </Box>
        </TabPanel>
      </Box>

      <ConfirmModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={fetchDesactiveMeUser}
        ModalTitle={'Are you sure you want to delete your profile?'}
        ModalContent={'This action causes your account to become to a state of inactive from the moment of confirmation. In this state you will not be able to login the app with your account. After two to four months of inactivity, the administration will proceed to delete your data permanently. If you want to regain access to your profile, you must contact an administrator within a maximum period of one month. Are you sure you want to proceed with this?'}
      />
    </>
  )
}
