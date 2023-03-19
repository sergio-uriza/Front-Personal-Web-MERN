import * as Yup from 'yup'

export const registerSchema = Yup.object({
  firstname: Yup
    .string()
    .trim()
    .matches(/^[a-zA-ZÀ-ÿ0-9]+$/, 'Invalid characters')
    .min(3, 'Min 3 characters')
    .max(30, 'Max 30 characters')
    .required('Firstname is required'),
  lastname: Yup
    .string()
    .trim()
    .matches(/^[a-zA-ZÀ-ÿ0-9]+$/, 'Invalid characters')
    .min(3, 'Min 3 characters')
    .max(30, 'Max 30 characters')
    .required('Lastname is required'),
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
    .required('Password is required'),
  confpwd: Yup
    .string()
    .when('password', {
      is: (value: string | undefined) => ((value != null) && value.length > 0),
      then: Yup.string().oneOf([Yup.ref('password')], 'Password must match')
    })
    .required('You must confirm the password'),
  terms: Yup
    .bool()
    .required()
    .oneOf([true], 'Terms must be accepted')
})

export type RegisterFormType = Yup.InferType<typeof registerSchema>
