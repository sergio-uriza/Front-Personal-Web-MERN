import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import SendIcon from '@mui/icons-material/Send'
import CircularProgress from '@mui/material/CircularProgress'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import { useFormik } from 'formik'
import { useCallback } from 'react'
import { CourseTypeAPI } from '../../../services/types/api-res'
import { useFormError } from '../../../hooks/useFormError'
import { useDropzoneImage } from '../../../hooks/useDropzoneImage'
import { useAuthContext } from '../../../hooks/context/useAuthContext'
import { SERVER_ROUTES } from '../../../services/config/constants.config'
import { CourseFormType, courseSchema } from '../../../schemas/adminPage/course.schema'
import { createCourse, updateCourse } from '../../../services/courseService'
import { useSnackbar } from 'notistack'

const extractPrefix = (text: string): 'https://' | 'http://' => {
  if (text.startsWith('https://')) return 'https://'
  return 'http://'
}

const extractWithoutPrefix = (text: string): string => {
  if (text.startsWith('https://')) return text.substring(8)
  return text.substring(7)
}

const initialValues = (
  course?: CourseTypeAPI
): CourseFormType & { prefix: 'https://' | 'http://', miniature?: File } => {
  return {
    miniatureURL: course?.miniature ?? '',
    miniature: undefined,
    title: course?.title ?? '',
    description: course?.description ?? '',
    price: course?.price ?? 0,
    score: course?.score ?? 0,
    url: course?.url != null ? extractWithoutPrefix(course.url) : '',
    prefix: course?.url != null ? extractPrefix(course.url) : 'https://'
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
  }
]

type PropsType = {
  handleCloseModal: () => void
  handleNewGet: () => void
  course?: CourseTypeAPI
}

export function CourseForm ({ handleCloseModal, handleNewGet, course }: PropsType): JSX.Element {
  const { formError, clearFormError, handleFormError } = useFormError()
  const { accessToken } = useAuthContext()
  const { enqueueSnackbar } = useSnackbar()

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
    initialValues: initialValues(course),
    validationSchema: courseSchema,
    onSubmit: async ({ title, description, price, score, url, prefix, miniature }, { resetForm }) => {
      try {
        clearFormError()
        if (course == null) {
          await createCourse(
            accessToken,
            {
              title,
              description,
              price,
              score: Number(score.toFixed(1)),
              url: prefix.concat(url)
            },
            miniature
          )
          enqueueSnackbar('Course Created', { variant: 'success' })
        } else {
          await updateCourse(
            accessToken,
            course._id,
            {
              title,
              description,
              price,
              score: Number(score.toFixed(1)),
              url: (prefix.concat(url) !== course.url ? prefix.concat(url) : undefined)
            },
            miniature
          )
          enqueueSnackbar('Course Updated', { variant: 'success' })
        }
        resetForm()
        handleNewGet()
        handleCloseModal()
      } catch (err) {
        handleFormError(err)
      }
    }
  })

  const onDrop = useCallback((acceptedFiles: File[]): void => {
    if (acceptedFiles.length === 0) return
    const file = acceptedFiles[0]
    void setFieldValue('miniatureURL', URL.createObjectURL(file))
    void setFieldValue('miniature', file)
  }, [setFieldValue])

  const { getRootProps, getInputProps } = useDropzoneImage(onDrop)

  const getRouteMiniature = (): string | undefined => {
    if (values.miniature != null) {
      return values.miniatureURL
    } else if (values.miniatureURL !== '') {
      return `${SERVER_ROUTES.BASE_PATH}/${values.miniatureURL}`
    }
    return undefined
  }

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1, px: '7%' }} >
      <Grid container rowSpacing={{ xs: 1, sm: 2 }} columnSpacing={3}>
        <Grid xs={12} sm={12} display='flex' alignItems='center' flexDirection='column'>
          <div {...getRootProps()}>
            <input {...getInputProps()} name='miniatureURL' />
            <Avatar
              variant='rounded'
              sx={{
                fontSize: '53px',
                m: 1,
                width: 200,
                height: 117,
                border: 'dotted',
                cursor: 'pointer',
                '&:hover': { borderColor: '#bdbdbd' }
              }}
              alt='COURSE'
              src={getRouteMiniature()}
            >
              {values.miniatureURL === '' ? <PermMediaIcon sx={{ fontSize: '55px' }} /> : null}
            </Avatar>
          </div>
          <FormHelperText error sx={{ textAlign: 'center' }}>
            { (touched.miniatureURL === true) && errors.miniatureURL }
          </FormHelperText>
        </Grid>
        <Grid xs={12} sm={12}>
          <TextField
            name='title'
            id='title'
            label='Title'
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
        <Grid xs={12} sm={12}>
          <TextField
            name='description'
            id='description'
            label='Description'
            multiline
            placeholder='What is it about?'
            margin='none'
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(touched.description === true) && Boolean(errors.description)}
            helperText={(values.description !== '') && (touched.description === true) && errors.description}
            size='small'
            rows={3}
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
            name='url'
            id='url'
            label='URL'
            margin='none'
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(touched.url === true) && Boolean(errors.url)}
            helperText={(values.url !== '') && (touched.url === true) && errors.url}
            size='small'
            sx={{ flexGrow: '1' }}
            required
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            name='price'
            id='price'
            type='number'
            label='price'
            margin='none'
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(touched.price === true) && Boolean(errors.price)}
            helperText={(values.price !== 0) && (touched.price === true) && errors.price}
            size='small'
            required
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">COL $</InputAdornment>
            }}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            name='score'
            id='score'
            type='number'
            label='score'
            margin='none'
            value={values.score}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(touched.score === true) && Boolean(errors.score)}
            helperText={(values.score !== 0) && (touched.score === true) && errors.score}
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
