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
    .matches(/^([^<>]*)$/, 'Invalid characters')
    .matches(/(?=.*[a-z])/, 'At least 1 lowercase')
    .matches(/(?=.*[A-Z])/, 'At least 1 uppercase')
    .matches(/(?=.*[0-9])/, 'At least 1 number')
    .min(6, 'Min 6 characters')
    .max(18, 'Max 18 characters')
    .required('Password is required')
})

export type LoginFormType = Yup.InferType<typeof loginSchema>
