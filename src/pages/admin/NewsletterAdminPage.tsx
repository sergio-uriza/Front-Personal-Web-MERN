import './NewsletterAdminPage.scss'
import { useCallback, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { TabPanel } from '../../components/shared/TabPanel'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { ListNewsletters } from '../../components/adminPage/newsletterPage/ListNewsletters'

export function NewsletterAdminPage (): JSX.Element {
  const [newGet, setNewGet] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [order, setOrder] = useState<number>(1)

  const handleNewGet = (): void => { setNewGet((prev) => !prev) }
  const handlePage = (e: React.ChangeEvent<unknown>, v: number): void => { setPage(v) }
  const handleTotalPage = useCallback((value: number): void => { setTotalPages(value) }, [])
  const handleOrder = (): void => { setOrder((prev) => prev * -1) }

  return (
    <Box component='div' sx={{ position: 'relative' }}>
      <Button className='newsletteradminpage-modalbutton' variant='contained' onClick={handleOrder}>
        {order === 1 ? 'Descending Order' : 'Ascending Order'}
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
          <Tab className='newsletteradminpage-tab' label='All' icon={<DoneAllIcon />} sx={{ opacity: '0', cursor: 'default', textTransform: 'capitalize' }} />
        </Tabs>
      </Box>
      <TabPanel value={0} index={0}>
        <>
          <Grid container rowSpacing={1} columnSpacing={2} sx={{ height: 'calc(100vh - 14.7rem)', overflowY: 'scroll', alignContent: 'flex-start', '&::-webkit-scrollbar': { display: 'none' } }}>
            <ListNewsletters page={page} handleTotalPage={handleTotalPage} order={order} newGet={newGet} handleNewGet={handleNewGet} />
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
  )
}
