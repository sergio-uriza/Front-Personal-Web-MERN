import './UsersAdminPage.scss'
import { useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import { TabPanel } from '../../components/shared/TabPanel'
import { BasicModal } from '../../components/shared/BasicModal'
import { useModalComponent } from '../../hooks/useModalComponent'
import { UserForm } from '../../components/adminPage/userPage/UserForm'
import { UsersList } from '../../components/adminPage/userPage/UsersList'

export function UsersAdminPage (): JSX.Element {
  const [value, setValue] = useState<number>(0)
  const [newGet, setNewGet] = useState<boolean>(false)

  const handleChange = (e: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }
  const handleNewGet = useCallback((): void => { setNewGet((prev) => !prev) }, [])
  const { showModal, handleOpenModal, handleCloseModal } = useModalComponent()

  return (
    <>
      <Box component='div' sx={{ position: 'relative' }}>
        <Button
          className='usersadminpage-modalbutton'
          variant='contained'
          onClick={handleOpenModal}
        >
          New User
        </Button>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons='auto'
            textColor='secondary'
            indicatorColor='secondary'
            aria-label='primary tabs'
          >
            <Tab
              className='usersadminpage-tab'
              label='Active'
              icon={<VerifiedUserIcon />}
              sx={{ textTransform: 'capitalize' }}
            />
            <Tab
              className='usersadminpage-tab'
              label='Inactive'
              icon={<PersonOffIcon />}
              sx={{ textTransform: 'capitalize' }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={2}
            sx={{
              height: 'calc(100vh - 11.6rem)',
              overflowY: 'scroll',
              alignContent: 'flex-start',
              '&::-webkit-scrollbar': { display: 'none' }
            }}
          >
            <UsersList
              isUserActive={true}
              newGet={newGet}
              handleNewGet={handleNewGet}
            />
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={2}
            sx={{
              height: 'calc(100vh - 11.6rem)',
              overflowY: 'scroll',
              alignContent: 'flex-start',
              '&::-webkit-scrollbar': { display: 'none' }
            }}
          >
            <UsersList
              isUserActive={false}
              newGet={newGet}
              handleNewGet={handleNewGet}
            />
          </Grid>
        </TabPanel>
      </Box>

      <BasicModal
        show={showModal}
        handleClose={handleCloseModal}
        ModalTitle='Create User'
      >
        <UserForm
          handleCloseModal={handleCloseModal}
          handleNewGet={handleNewGet}
        />
      </BasicModal>
    </>
  )
}
