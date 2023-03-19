import * as Yup from 'yup'

export const newsletterSchema = Yup.object({
  email: Yup
    .string()
    .trim()
    .lowercase()
    .email('Enter a valid email')
    .max(50, 'Max 50 characters')
    .required('Email is required')
})

export type NewsletterFormType = Yup.InferType<typeof newsletterSchema>
