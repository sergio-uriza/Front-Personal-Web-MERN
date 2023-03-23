import * as Yup from 'yup'

export const loginSchema = Yup.object({
  email: Yup
    .string()
    .trim()
    .lowercase()
    .email('Enter a valid email')
    .max(50, 'Max 50 characters')
    .required('Email is required'),
  password: Yup
    .string()
    .max(20, 'Max 20 characters')
    .required('Password is required')
})

export type LoginFormType = Yup.InferType<typeof loginSchema>
