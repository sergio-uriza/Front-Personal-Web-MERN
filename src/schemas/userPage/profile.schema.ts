import * as Yup from 'yup'

export const profileUserSchema = Yup.object().shape({
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
  oldPassword: Yup
    .string()
    .when('newPassword', {
      is: (value: string | undefined) => (value != null),
      then: Yup.string().required(),
      otherwise: Yup.string().optional()
    }),
  newPassword: Yup
    .string()
    .matches(/^([^<>]*)$/, 'Invalid characters')
    .matches(/(?=.*[a-z])/, 'At least 1 lowercase')
    .matches(/(?=.*[A-Z])/, 'At least 1 uppercase')
    .matches(/(?=.*[0-9])/, 'At least 1 number')
    .min(6, 'Min 6 characters')
    .max(18, 'Max 18 characters')
    .when('oldPassword', {
      is: (value: string | undefined) => (value != null),
      then: Yup.string().required(),
      otherwise: Yup.string().optional()
    }),
  confNewPwd: Yup
    .string()
    .when('newPassword', {
      is: (value: string | undefined) => (value != null),
      then: Yup.string().oneOf([Yup.ref('newPassword')], 'New password must match').required(),
      otherwise: Yup.string().optional()
    })
}, [['newPassword', 'oldPassword']])

export type ProfileUserFormType = Pick<Yup.InferType<typeof profileUserSchema>, 'firstname' | 'lastname' | 'email' | 'oldPassword' | 'newPassword' | 'confNewPwd'>
