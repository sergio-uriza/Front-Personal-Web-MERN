import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'
import { Box } from '@mui/material'
import { useFormik } from 'formik'
import { useFormError } from '../../hooks/useFormError'
import { TermsAndConditions } from '../property/TermsAndConditions'
import { useModalComponent } from '../../hooks/useModalComponent'
import { NewsletterFormType, newsletterSchema } from '../../schemas/forms/newsletter.schema'
import { suscribeNewsletter } from '../../services/newsletterService'

const initialValues: NewsletterFormType = {
  email: ''
}

export function NewsletterForm (): JSX.Element {
  const { formError, clearFormError, handleFormError } = useFormError()
  const { showModal, handleOpenModal, handleCloseModal } = useModalComponent()

  const {
    handleSubmit,
    handleChange,
    isSubmitting,
    values,
    touched,
    errors
  } = useFormik({
    initialValues,
    validationSchema: newsletterSchema,
    onSubmit: async ({ email }, { resetForm }) => {
      try {
        clearFormError()
        await suscribeNewsletter(email)
        resetForm()
      } catch (err) {
        handleFormError(err)
      }
    }
  })

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1, px: 0 }} >
      <TextField
        name='email'
        id='email'
        type='email'
        label='Email Address'
        margin='none'
        value={values.email}
        onChange={handleChange}
        error={(values.email !== '') && (touched.email === true) && Boolean(errors.email)}
        helperText={(values.email !== '') && (touched.email === true) && errors.email}
        autoComplete='email'
        variant='filled'
        size='small'
        required
        fullWidth
        sx={{ ' input': { bgcolor: 'white' } }}
      />

      <Button
        type='submit'
        variant='contained'
        sx={{ mt: 1, mb: 0 }}
        disabled={isSubmitting}
        fullWidth
      >
        { isSubmitting
          ? (
              <>
                <CircularProgress color='inherit' size='1rem' sx={{ mx: 1 }}/>
                <span>Subscribing</span>
              </>
            )
          : (
              <span>Subscribe</span>
            )
        }
      </Button>

      <Grid container justifyContent='flex-end'>
        <Grid textAlign='end' sx={{ p: 0 }}>
          <Link
            variant='caption'
            onClick={handleOpenModal}
            sx={{ fontStyle: 'italic', '&:hover': { cursor: 'pointer' } }}
          >
            ⓘ Terms and privacy policy
          </Link>
          <TermsAndConditions show={showModal} handleClose={handleCloseModal} />
        </Grid>
      </Grid>

      <Typography
        component='p'
        sx={{ fontSize: '0.8rem', color: '#9f3a38', textAlign: 'center', mt: '0.7rem' }}
      >
        { formError }
      </Typography>

    </Box>
  )
}
