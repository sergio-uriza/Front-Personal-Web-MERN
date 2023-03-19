import * as Yup from 'yup'

export const menuSchema = Yup.object({
  title: Yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9À-ÿ?¿!¡\s]+$/, 'Invalid characters')
    .min(3, 'Min 3 characters')
    .max(18, 'Max 18 characters')
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
    .matches(/^[\w-@:;+.?&/=$!*]+$/, 'Invalid characters')
    .min(3, 'Min 3 characters')
    .max(160, 'Max 160 characters')
    .required('Path is required')
})

export type MenuFormType = Yup.InferType<typeof menuSchema>
