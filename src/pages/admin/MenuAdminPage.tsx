import './MenuAdminPage.scss'
import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import { TabPanel } from '../../components/shared/TabPanel'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import WebAssetOffIcon from '@mui/icons-material/WebAssetOff'
import Grid from '@mui/material/Unstable_Grid2'
import { BasicModal } from '../../components/shared/BasicModal'
import { useModalComponent } from '../../hooks/useModalComponent'
import { ListMenus } from '../../components/adminPage/menuPage/ListMenus'
import { MenuForm } from '../../components/adminPage/menuPage/MenuForm'

export function MenuAdminPage (): JSX.Element {
  const [value, setValue] = useState<number>(0)
  const [newGet, setNewGet] = useState<boolean>(false)

  const handleChange = (e: React.SyntheticEvent, newValue: number): void => { setValue(newValue) }
  const handleNewGet = (): void => { setNewGet((prev) => !prev) }
  const { showModal, handleOpenModal, handleCloseModal } = useModalComponent()

  return (
    <>
      <Box component='div' sx={{ position: 'relative' }}>
        <Button className='menuadminpage-modalbutton' variant='contained' onClick={handleOpenModal}>
          New Menu
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
            <Tab className='menuadminpage-tab' label='Active' icon={<WebAssetIcon />} sx={{ textTransform: 'capitalize' }} />
            <Tab className='menuadminpage-tab' label='Inactive' icon={<WebAssetOffIcon />} sx={{ textTransform: 'capitalize' }} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container rowSpacing={1} columnSpacing={2} sx={{ height: 'calc(100vh - 11.6rem)', overflowY: 'scroll', alignContent: 'flex-start', '&::-webkit-scrollbar': { display: 'none' } }}>
            <ListMenus isMenuActive={true} newGet={newGet} handleNewGet={handleNewGet} />
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container rowSpacing={1} columnSpacing={2} sx={{ height: 'calc(100vh - 11.6rem)', overflowY: 'scroll', alignContent: 'flex-start', '&::-webkit-scrollbar': { display: 'none' } }}>
            <ListMenus isMenuActive={false} newGet={newGet} handleNewGet={handleNewGet} />
          </Grid>
        </TabPanel>
      </Box>

      <BasicModal
        show={showModal}
        handleClose={handleCloseModal}
        ModalTitle='Create Menu'
      >
        <MenuForm handleCloseModal={handleCloseModal} handleNewGet={handleNewGet} />
      </BasicModal>
    </>
  )
}
