import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send'
import CircularProgress from '@mui/material/CircularProgress'
import { useFormik } from 'formik'
import { useFormError } from '../../../hooks/useFormError'
import { useAuthContext } from '../../../hooks/context/useAuthContext'
import { GetMultipleMenuType } from '../../../services/types'
import { MenuFormType, menuSchema } from '../../../schemas/adminPage/menu.schema'
import { createMenu, updateMenu } from '../../../services/menuService'

const extractPrefix = (text: string): 'https://' | 'http://' | '/' => {
  if (text.startsWith('https://')) return 'https://'
  if (text.startsWith('http://')) return 'http://'
  return '/'
}

const extractWithoutPrefix = (text: string): string => {
  if (text.startsWith('https://')) return text.substring(8)
  if (text.startsWith('http://')) return text.substring(7)
  return text.substring(1)
}

const initialValues = (menu?: GetMultipleMenuType): MenuFormType & { prefix: 'https://' | 'http://' | '/' } => {
  return {
    title: menu?.title ?? '',
    order: menu?.order ?? 0,
    path: menu?.path != null ? extractWithoutPrefix(menu.path) : '',
    prefix: menu?.path != null ? extractPrefix(menu.path) : 'https://'
  }
}

const prefixOptions = [
  {
    value: 'https://',
    label: 'https://'
  },
  {
    value: 'http://',
    label: 'http://'
  },
  {
    value: '/',
    label: '/'
  }
]

type PropsType = {
  handleCloseModal: () => void
  handleNewGet: () => void
  menu?: GetMultipleMenuType
}

export function MenuForm ({ handleCloseModal, handleNewGet, menu }: PropsType): JSX.Element {
  const { formError, clearFormError, handleFormError } = useFormError()
  const { accessToken } = useAuthContext()

  const { handleSubmit, handleChange, handleBlur, isSubmitting, values, touched, errors } = useFormik({
    initialValues: initialValues(menu),
    validationSchema: menuSchema,
    onSubmit: async ({ title, order, path, prefix }, { resetForm }) => {
      try {
        clearFormError()
        if (menu == null) {
          await createMenu(
            accessToken,
            { title, order, path: prefix.concat(path), active: false }
          )
        } else {
          await updateMenu(
            accessToken,
            menu._id,
            { title, order: (order !== menu.order ? order : undefined), path: (prefix.concat(path) !== menu.path ? prefix.concat(path) : undefined) }
          )
        }
        resetForm()
        handleNewGet()
        handleCloseModal()
      } catch (err) {
        handleFormError(err)
      }
    }
  })

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1, px: '7%' }} >
      <Grid container rowSpacing={{ xs: 1, sm: 2 }} columnSpacing={3}>
        <Grid xs={12} sm={6}>
          <TextField
            name='title'
            id='title'
            label='Title Menu'
            margin='none'
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(touched.title === true) && Boolean(errors.title)}
            helperText={(values.title !== '') && (touched.title === true) && errors.title}
            autoComplete='given-name'
            size='small'
            required
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            name='order'
            id='order'
            type='number'
            label='Unique Order'
            margin='none'
            value={values.order}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(touched.order === true) && Boolean(errors.order)}
            helperText={(values.order !== 0) && (touched.order === true) && errors.order}
            autoComplete='family-name'
            size='small'
            required
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={12} sx={{ display: 'flex' }}>
          <TextField
            name='prefix'
            id='prefix'
            select
            margin='none'
            defaultValue={values.prefix}
            value={values.prefix}
            onChange={handleChange}
            size='small'
            sx={{ minWidth: '70px', '> div': { bgcolor: 'rgb(0 0 0 / 12%)', textAlign: 'center' } }}
            required
          >
            {prefixOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name='path'
            id='path'
            label='path'
            margin='none'
            value={values.path}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(touched.path === true) && Boolean(errors.path)}
            helperText={(values.path !== '') && (touched.path === true) && errors.path}
            size='small'
            sx={{ flexGrow: '1' }}
            required
          />
        </Grid>
      </Grid>

      <Box component='div' sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type='submit'
          variant='contained'
          sx={{ mt: 3, textTransform: 'capitalize', minWidth: '140px' }}
          disabled={isSubmitting}
          endIcon={isSubmitting ? <CircularProgress color='inherit' size='1rem'/> : <SendIcon sx={{ fontSize: '15px !important' }} />}
        >
          { isSubmitting
            ? <span>Sending</span>
            : <span>Send</span>
          }
        </Button>
      </Box>

      <Typography component='p' sx={{ fontSize: '0.8rem', color: '#9f3a38', textAlign: 'center', marginTop: '0.7rem' }}>
        { formError }
      </Typography>

    </Box>
  )
}
