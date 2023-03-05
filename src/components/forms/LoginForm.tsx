import './LoginForm.scss'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'
import { Formik } from 'formik'
import { LoginFormType, loginSchema } from '../../schemas/login.schema'
import { useFormError } from '../../hooks/useFormError'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/context/useAuthContext'
import { setAccTokenLocalStorage, setRefTokenLocalStorage } from '../../utils/localStorage'
import { LoginUserAuthType } from '../../services/types'
import { useNavigate } from 'react-router-dom'

const initialValues: LoginFormType = {
  email: '',
  pwd: ''
}

type PropsType = {
  fetchLogin: (email: string, password: string) => Promise<LoginUserAuthType>
}

export function LoginForm ({ fetchLogin }: PropsType): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { formError, clearFormError, handleFormError } = useFormError()
  const { loginAuthHandler } = useAuthContext()
  const navigate = useNavigate()

  const handleClickShowPassword = (): void => { setShowPassword((prev) => !prev) }
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>): void => { e.preventDefault() }
  const redirectToHome = (): void => { navigate('/') }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={async ({ email, pwd }, { resetForm }) => {
        try {
          clearFormError()
          const { accessToken, refreshToken } = await fetchLogin(email, pwd)
          await loginAuthHandler(accessToken)
          setAccTokenLocalStorage(accessToken)
          setRefTokenLocalStorage(refreshToken)
          resetForm()
        } catch (err) {
          handleFormError(err)
        }
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, isSubmitting, values, touched, errors }) => (
        <Box className='loginform-form' component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} display='flex' justifyContent='center'>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 55, height: 55 }}>
                <ManageAccountsOutlinedIcon fontSize='large' />
              </Avatar>
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
                autoFocus
              />
            </Grid>
            <Grid xs={12}>
              <FormControl
                variant='outlined'
                error={(touched.pwd === true) && Boolean(errors.pwd)}
                size='small'
                fullWidth
              >
                <InputLabel htmlFor='pwd'>Password</InputLabel>
                <OutlinedInput
                  name='pwd'
                  id='pwd'
                  type={showPassword ? 'text' : 'password'}
                  label='Password'
                  margin='none'
                  value={values.pwd}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='current-password'
                  required
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility color='primary' />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  {(values.pwd !== '') && (touched.pwd === true) && errors.pwd}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 4, mb: 2 }}
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
              <Link onClick={redirectToHome} variant='body2' sx={{ fontStyle: 'italic', '&:hover': { cursor: 'pointer' } }}>
                Just visiting? Return to home page
              </Link>
            </Grid>
          </Grid>

          <Typography className='form-error' component='p' >
            { formError }
          </Typography>

        </Box>
      )}
    </Formik>
  )
}
