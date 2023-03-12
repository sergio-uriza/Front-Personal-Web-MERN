import './BlogAdminPage.scss'
import { useState, useCallback } from 'react'
import { Box } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2'
import Pagination from '@mui/material/Pagination'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { TabPanel } from '../../components/shared/TabPanel'
import { BasicModal } from '../../components/shared/BasicModal'
import { useModalComponent } from '../../hooks/useModalComponent'
import { BlogsList } from '../../components/adminPage/blogPage/BlogsList'
import { BlogForm } from '../../components/adminPage/blogPage/BlogForm'

export function BlogAdminPage (): JSX.Element {
  const [newGet, setNewGet] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const handleNewGet = (): void => { setNewGet((prev) => !prev) }
  const handlePage = (e: React.ChangeEvent<unknown>, v: number): void => { setPage(v) }
  const handleTotalPage = useCallback((value: number): void => { setTotalPages(value) }, [])
  const { showModal, handleOpenModal, handleCloseModal } = useModalComponent()

  return (
    <>
      <Box component='div' sx={{ position: 'relative' }}>
        <Button className='blogadminpage-modalbutton' variant='contained' onClick={handleOpenModal}>
          New Blog
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
            <Tab className='coursesadminpage-tab' label='All' icon={<DoneAllIcon />} sx={{ opacity: '0', cursor: 'default', textTransform: 'capitalize' }} />
          </Tabs>
        </Box>
        <TabPanel value={0} index={0}>
          <>
            <Grid container rowSpacing={1} columnSpacing={2} sx={{ height: 'calc(100vh - 14.7rem)', overflowY: 'scroll', alignContent: 'flex-start', '&::-webkit-scrollbar': { display: 'none' } }}>
              <BlogsList page={page} handleTotalPage={handleTotalPage} newGet={newGet} handleNewGet={handleNewGet} />
            </Grid>
            <Stack spacing={2} sx={{ alignItems: 'center', mt: '18px' }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePage}
                variant='outlined'
                color='secondary'
                siblingCount={0}
              />
            </Stack>
          </>
        </TabPanel>
      </Box>

      <BasicModal
        show={showModal}
        handleClose={handleCloseModal}
        ModalTitle='Create Blog'
      >
        <BlogForm handleCloseModal={handleCloseModal} handleNewGet={handleNewGet} />
      </BasicModal>
    </>
  )
}
