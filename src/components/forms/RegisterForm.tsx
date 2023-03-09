import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'
import { useFormik } from 'formik'
import { registerSchema, RegisterFormType } from '../../schemas/forms/register.schema'
import { useFormError } from '../../hooks/useFormError'
import { TermsAndConditions } from '../property/TermsAndConditions'
import { registerUserAuth } from '../../services/authService'
import { useModalComponent } from '../../hooks/useModalComponent'

const initialValues: RegisterFormType = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confpwd: '',
  terms: false
}

type PropsType = {
  setToLogin?: () => void
}

export function RegisterForm ({ setToLogin }: PropsType): JSX.Element {
  const { formError, clearFormError, handleFormError } = useFormError()
  const { showModal, handleOpenModal, handleCloseModal } = useModalComponent()

  const { handleSubmit, handleChange, handleBlur, setFieldValue, isSubmitting, values, touched, errors } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async ({ firstname, lastname, email, password }, { resetForm }) => {
      try {
        clearFormError()
        await registerUserAuth(firstname, lastname, email, password)
        resetForm()
        if (setToLogin != null) setToLogin()
      } catch (err) {
        handleFormError(err)
      }
    }
  })

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1, px: '10%' }} >
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} display='flex' justifyContent='center'>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 55, height: 55 }}>
            <PersonAddAltOutlinedIcon fontSize='large' />
          </Avatar>
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            name='firstname'
            id='firstname'
            label='First Name'
            margin='none'
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(touched.firstname === true) && Boolean(errors.firstname)}
            helperText={(values.firstname !== '') && (touched.firstname === true) && errors.firstname}
            autoComplete='given-name'
            size='small'
            required
            fullWidth
            autoFocus
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            name='lastname'
            id='lastname'
            label='Last Name'
            margin='none'
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(touched.lastname === true) && Boolean(errors.lastname)}
            helperText={(values.lastname !== '') && (touched.lastname === true) && errors.lastname}
            autoComplete='family-name'
            size='small'
            required
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            name='email'
            id='email'
            type='email'
            label='Email Address'
            margin='none'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(touched.email === true) && Boolean(errors.email)}
            helperText={(values.email !== '') && (touched.email === true) && errors.email}
            autoComplete='email'
            size='small'
            required
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            name='password'
            id='password'
            type='password'
            label='Password'
            margin='none'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(touched.password === true) && Boolean(errors.password)}
            helperText={(values.password !== '') && (touched.password === true) && errors.password}
            autoComplete='new-password'
            size='small'
            required
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            name='confpwd'
            id='confpwd'
            type='password'
            label='Confirm Password'
            margin='none'
            value={values.confpwd}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(touched.confpwd === true) && Boolean(errors.confpwd)}
            helperText={(values.confpwd !== '') && (touched.confpwd === true) && errors.confpwd}
            size='small'
            required
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <FormControl
            error={(touched.terms === true) && Boolean(errors.terms)}
            variant='standard'
            margin='none'
            required
          >
            <FormControlLabel control={
              <Checkbox
                name='terms'
                value='conditions'
                color='primary'
                size='small'
                checked={values.terms}
                onChange={(e) => { void setFieldValue('terms', e.target.checked) }}
                onBlur={handleBlur}
                required
              />
            }
              label='I agree to the terms and conditions *'
            />
            <FormHelperText>{ (touched.terms === true) && errors.terms }</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        type='submit'
        variant='contained'
        sx={{ mt: 2, mb: 2 }}
        disabled={isSubmitting}
        fullWidth
      >
        { isSubmitting
          ? (<> <CircularProgress color='inherit' size='1rem' sx={{ mx: 1 }}/> <span>Sending...</span> </>)
          : (<span>Sign In</span>)
        }
      </Button>

      <Grid container justifyContent='flex-end'>
        <Grid textAlign='end'>
          <Link
            variant='body2'
            onClick={handleOpenModal}
            sx={{ fontStyle: 'italic', '&:hover': { cursor: 'pointer' } }}
          >
            ⓘ Terms of service and privacy policy
          </Link>
          <TermsAndConditions show={showModal} handleClose={handleCloseModal} />
        </Grid>
      </Grid>

      <Typography component='p' sx={{ fontSize: '0.8rem', color: '#9f3a38', textAlign: 'center', mt: '0.7rem' }}>
        { formError }
      </Typography>

    </Box>
  )
}
