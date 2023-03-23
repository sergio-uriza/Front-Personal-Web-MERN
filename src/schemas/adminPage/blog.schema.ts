import * as Yup from 'yup'

export const blogSchema = Yup.object({
  miniatureURL: Yup
    .string()
    .required('Miniature is required'),
  title: Yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9À-ÿ?¿!¡:;)(+.,$'"\-\s]+$/, 'Invalid characters')
    .min(8, 'Min 8 characters')
    .max(80, 'Max 80 characters')
    .required('Title is required'),
  path: Yup
    .string()
    .trim()
    .matches(/^[\w-@:+.=]+$/, 'Invalid characters')
    .min(3, 'Min 3 characters')
    .max(360, 'Max 360 characters')
    .required('Path is required'),
  content: Yup
    .string()
    .min(30, 'Min 30 characters')
    .max(28000, 'Max 28000 characters')
    .required('Content is required')
})

export type BlogFormType = Yup.InferType<typeof blogSchema>
