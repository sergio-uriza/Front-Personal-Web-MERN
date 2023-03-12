import * as Yup from 'yup'

export const courseSchema = Yup.object({
  miniatureURL: Yup
    .string()
    .required('Miniature is required'),
  title: Yup
    .string()
    .trim()
    .min(8, 'Minimum 8 characters length')
    .required('Title is required'),
  description: Yup
    .string()
    .trim()
    .min(15, 'Minimum 15 characters length')
    .required('Description is required'),
  price: Yup
    .number()
    .integer('Integer number')
    .positive('Positive value')
    .max(5000000, 'Number too high')
    .required('Price is required'),
  score: Yup
    .number()
    .min(0, 'Minimum value is 0')
    .max(5, 'Maximum value is 5')
    .required('Score is required'),
  url: Yup
    .string()
    .trim()
    .matches(/^[\w-@:;)(+.?&/=$!*']+$/, 'Invalid characters')
    .min(5, 'Minimum 5 characters length')
    .required('URL is required')
})

export type CourseFormType = Yup.InferType<typeof courseSchema>
