import * as Yup from 'yup'

export const blogSchema = Yup.object({
  miniatureURL: Yup
    .string()
    .optional(),
  title: Yup
    .string()
    .trim()
    .min(8, 'Minimum 8 characters length')
    .required('Title is required'),
  path: Yup
    .string()
    .trim()
    .matches(/^[\w-@:+.=]+$/, 'Invalid characters')
    .min(3, 'Minimum 3 characters length')
    .required('Path is required'),
  content: Yup
    .string()
    .required('Content is required')
})

export type BlogFormType = Yup.InferType<typeof blogSchema>
