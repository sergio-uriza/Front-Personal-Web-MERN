import * as Yup from 'yup'

export const registerSchema = Yup.object({
  firstname: Yup
    .string()
    .trim()
    .min(3, 'Minimum 3 characters length')
    .required('Firstname is required'),
  lastname: Yup
    .string()
    .trim()
    .min(3, 'Minimum 3 characters length')
    .required('Lastname is required'),
  email: Yup
    .string()
    .trim()
    .lowercase()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string()
    .min(6, 'Minimum 6 characters length')
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
