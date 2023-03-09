import * as Yup from 'yup'

export const menuSchema = Yup.object({
  title: Yup
    .string()
    .trim()
    .min(3, 'Minimum 3 characters length')
    .required('Title is required'),
  order: Yup
    .number()
    .integer('Integer number')
    .min(-100, 'Number too low')
    .max(100, 'Number too high')
    .required('Order is required'),
  path: Yup
    .string()
    .trim()
    .matches(/^[\w-@:+.?&//=]+$/, 'Invalid characters')
    .min(3, 'Minimum 3 characters length')
    .required('Path is required')
})

export type MenuFormType = Yup.InferType<typeof menuSchema>
