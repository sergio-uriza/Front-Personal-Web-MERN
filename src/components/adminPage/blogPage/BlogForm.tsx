import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import SendIcon from '@mui/icons-material/Send'
import CircularProgress from '@mui/material/CircularProgress'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import { Editor } from '@tinymce/tinymce-react'
import { useFormik } from 'formik'
import { useCallback } from 'react'
import { BlogTypeAPI } from '../../../services/types/api-res'
import { useFormError } from '../../../hooks/useFormError'
import { useDropzoneImage } from '../../../hooks/useDropzoneImage'
import { useAuthContext } from '../../../hooks/context/useAuthContext'
import { SERVER_ROUTES } from '../../../services/config/constants.config'
import { BlogFormType, blogSchema } from '../../../schemas/adminPage/blog.schema'
import { createBlog, updateBlog } from '../../../services/blogService'
import { useSnackbar } from 'notistack'

const extractWithoutPrefix = (text: string): string => {
  return text.substring(1)
}

const initialValues = (blog?: BlogTypeAPI): BlogFormType & { prefix: '/', miniature?: File } => {
  return {
    miniatureURL: blog?.miniature ?? '',
    miniature: undefined,
    title: blog?.title ?? '',
    prefix: '/',
    path: blog?.path != null ? extractWithoutPrefix(blog.path) : '',
    content: blog?.content ?? ''
  }
}

type PropsType = {
  handleCloseModal: () => void
  handleNewGet: () => void
  blog?: BlogTypeAPI
}

export function BlogForm ({ handleCloseModal, handleNewGet, blog }: PropsType): JSX.Element {
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
    initialValues: initialValues(blog),
    validationSchema: blogSchema,
    onSubmit: async ({ title, path, prefix, content, miniature }, { resetForm }) => {
      try {
        clearFormError()
        if (blog == null) {
          await createBlog(
            accessToken,
            { title, content, path: prefix.concat(path) },
            miniature
          )
          enqueueSnackbar('Blog Created', { variant: 'success' })
        } else {
          await updateBlog(
            accessToken,
            blog._id,
            {
              title,
              content: (content !== blog.content ? content : undefined),
              path: (prefix.concat(path) !== blog.path ? prefix.concat(path) : undefined)
            },
            miniature
          )
          enqueueSnackbar('Blog Updated', { variant: 'success' })
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
    } else if (values.miniatureURL != null && values.miniatureURL !== '') {
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
                width: 230,
                height: 145,
                border: 'dotted',
                cursor: 'pointer',
                '&:hover': { borderColor: '#bdbdbd' }
              }}
              alt='BLOG'
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
        <Grid xs={12} sm={12} sx={{ display: 'flex' }}>
          <TextField
            name='prefix'
            id='prefix'
            margin='none'
            value={values.prefix}
            size='small'
            sx={{
              width: '2.2rem',
              minWidth: '35px',
              '> div': { bgcolor: 'rgb(0 0 0 / 12%)', textAlign: 'center' }
            }}
            InputProps={{ readOnly: true }}
            required
          />
          <TextField
            name='path'
            id='path'
            label='Path'
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
        <Grid xs={12} sm={12}>
          <Editor
            initialValue={blog?.content}
            init={{
              height: 400,
              menubar: false,
              placeholder: 'What do you want to share with us?...',
              plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks fullscreen insertdatetime media table codesample code help wordcount',
              codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
                { text: 'PHP', value: 'php' },
                { text: 'Ruby', value: 'ruby' },
                { text: 'Python', value: 'python' },
                { text: 'Java', value: 'java' },
                { text: 'C', value: 'c' },
                { text: 'C#', value: 'csharp' },
                { text: 'C++', value: 'cpp' }
              ],
              toolbar: 'undo redo | bold italic underline forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | lineheight backcolor | ' +
              'fontsize fontfamily | codesample paste pastetext | subscript superscript hr | removeformat help',
              toolbar_mode: 'scrolling'
            }}
            onChange={(e) => { void setFieldValue('content', e.target.getContent()) }}
          />
          <FormHelperText error sx={{ textAlign: 'center' }}>
            { (touched.content === true) && errors.content }
          </FormHelperText>
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
