import * as Yup from 'yup'
import { UserRole } from '../../enums/userRole.enum'

export const createUserSchema = Yup.object({
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
  role: Yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole))
    .required('Role is required'),
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
    .required('You must confirm the password')
})

export const updateUserSchema = createUserSchema.pick(['firstname', 'lastname', 'email', 'role']).concat(
  Yup.object({
    password: Yup
      .string()
      .min(6, 'Minimum 6 characters length')
      .optional(),
    confpwd: Yup
      .string()
      .when('password', {
        is: (value: string | undefined) => (value != null),
        then: Yup.string().oneOf([Yup.ref('password')], 'Password must match').required()
      })
  })
)

export type UserFormType = Yup.InferType<typeof createUserSchema>
