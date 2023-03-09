import * as Yup from 'yup'

export const loginSchema = Yup.object({
  email: Yup
    .string()
    .trim()
    .lowercase()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string()
    .required('Password is required')
})

export type LoginFormType = Yup.InferType<typeof loginSchema>
