import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import SendIcon from '@mui/icons-material/Send'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import { useFormik } from 'formik'
import { useCallback } from 'react'
import { GetMyUserType } from '../../../services/types/api-res'
import { useFormError } from '../../../hooks/useFormError'
import { useDropzoneImage } from '../../../hooks/useDropzoneImage'
import { updateMyUser } from '../../../services/userService'
import { useAuthContext } from '../../../hooks/context/useAuthContext'
import { SERVER_ROUTES } from '../../../services/config/constants.config'
import { ProfileUserFormType, profileUserSchema } from '../../../schemas/userPage/profile.schema'
import { UserRole } from '../../../enums/userRole.enum'

const initialValues = (
  myUser: GetMyUserType
): ProfileUserFormType & { avatarURL: string, avatar?: File } => {
  return {
    avatarURL: myUser.avatar ?? '',
    avatar: undefined,
    firstname: myUser.firstname,
    lastname: myUser.lastname,
    email: myUser.email,
    role: (myUser.role === UserRole.ADMIN ? 'Administrator' : 'User'),
    password: '',
    confpwd: ''
  }
}

type PropsType = {
  myUser: GetMyUserType
}

export function ProfileForm ({ myUser }: PropsType): JSX.Element {
  const { formError, clearFormError, handleFormError } = useFormError()
  const { logoutAuthHandler, updateLoggedUserAuth } = useAuthContext()
  const { accessToken } = useAuthContext()

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    initialValues: initialValues(myUser),
    validationSchema: profileUserSchema,
    onSubmit: async ({ firstname, lastname, password, avatar }) => {
      try {
        clearFormError()
        const newMyUser = await updateMyUser(
          accessToken,
          { firstname, lastname, password },
          avatar
        )
        if (password != null && password !== '') {
          logoutAuthHandler()
        } else {
          updateLoggedUserAuth(newMyUser)
        }
      } catch (err) {
        handleFormError(err)
      }
    }
  })

  const onDrop = useCallback((acceptedFiles: File[]): void => {
    if (acceptedFiles.length === 0) return
    const file = acceptedFiles[0]
    void setFieldValue('avatarURL', URL.createObjectURL(file))
    void setFieldValue('avatar', file)
  }, [])

  const { getRootProps, getInputProps } = useDropzoneImage(onDrop)

  const getRouteAvatar = (): string | undefined => {
    if (values.avatar != null) {
      return values.avatarURL
    } else if (values.avatarURL != null && values.avatarURL !== '') {
      return `${SERVER_ROUTES.BASE_PATH}/${values.avatarURL}`
    }
    return undefined
  }

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1, px: '7%' }} >
      <Grid container rowSpacing={{ xs: 1, sm: 2 }} columnSpacing={3}>
        <Grid xs={12} sm={12} display='flex' justifyContent='center'>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Avatar
              sx={{
                m: 1,
                width: 140,
                height: 140,
                border: 'dotted',
                cursor: 'pointer',
                '&:hover': { borderColor: '#bdbdbd' }
              }}
              src={getRouteAvatar()}
            />
          </div>
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
        <Grid xs={12} sm={6}>
          <Tooltip title='Contact an administrator to change your email address' arrow>
            <TextField
              name='email'
              id='email'
              type='email'
              label='Email Address'
              margin='none'
              defaultValue={values.email}
              error={(touched.email === true) && Boolean(errors.email)}
              helperText={(values.email !== '') && (touched.email === true) && errors.email}
              size='small'
              required
              fullWidth
              disabled
            />
          </Tooltip>
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            name='role'
            id='role'
            label='Role'
            margin='none'
            defaultValue={values.role}
            error={(touched.role === true) && Boolean(errors.role)}
            helperText={(touched.role === true) && errors.role}
            size='small'
            required
            fullWidth
            disabled
          />
        </Grid>
        <Grid xs={12} sm={6}>
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
        <Grid xs={12} sm={6}>
          <TextField
            name='confpwd'
            id='confpwd'
            type='password'
            label='Confirm Pwd'
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
      </Grid>

      <Box component='div' sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type='submit'
          variant='contained'
          sx={{ mt: 3, textTransform: 'capitalize', minWidth: '140px' }}
          disabled={isSubmitting}
          endIcon={isSubmitting
            ? <CircularProgress color='inherit' size='1rem'/>
            : <SendIcon sx={{ fontSize: '15px !important' }} />
          }
        >
          { isSubmitting
            ? <span>Sending</span>
            : <span>Send</span>
          }
        </Button>
      </Box>

      <Typography
        component='p'
        sx={{ fontSize: '0.8rem', color: '#9f3a38', textAlign: 'center', marginTop: '0.7rem' }}
      >
        { formError }
      </Typography>
    </Box>
  )
}
