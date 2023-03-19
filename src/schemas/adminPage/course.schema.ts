import * as Yup from 'yup'

export const courseSchema = Yup.object({
  miniatureURL: Yup
    .string()
    .required('Miniature is required'),
  title: Yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9À-ÿ?¿!¡:;)(+.,$'"\-\s]+$/, 'Invalid characters')
    .min(8, 'Min 8 characters')
    .max(60, 'Max 60 characters')
    .required('Title is required'),
  description: Yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9À-ÿ?¿!¡:;)(+.,$'"\-\s]+$/, 'Invalid characters')
    .min(18, 'Min 8 characters')
    .max(160, 'Max 160 characters')
    .required('Description is required'),
  price: Yup
    .number()
    .integer('Integer number')
    .min(0, 'Positive number')
    .max(5000000, 'Number too high')
    .required('Price is required'),
  score: Yup
    .number()
    .moreThan(0, 'More than 0')
    .max(5, 'Max value 5')
    .required('Score is required'),
  url: Yup
    .string()
    .trim()
    .matches(/^[\w-@:;)(+.?&/=$!*']+$/, 'Invalid characters')
    .min(10, 'Min 10 characters')
    .max(500, 'Max 500 characteres')
    .required('URL is required')
})

export type CourseFormType = Yup.InferType<typeof courseSchema>
