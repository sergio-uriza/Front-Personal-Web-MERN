import { useState } from 'react'
import { AxiosError } from 'axios'

type UseFormErrorType = {
  formError: string
  clearFormError: () => void
  handleFormError: (err: unknown) => void
}

export const useFormError = (): UseFormErrorType => {
  const [formError, setFormError] = useState<string>('')

  const clearFormError = (): void => {
    setFormError('')
  }

  const handleFormError = (err: unknown): void => {
    if (err instanceof AxiosError && err.response != null) {
      if (err.response.status === 403) {
        setFormError('Access Denied, inactive user or without permission to access')
      } else if (err.response.status >= 400 && err.response.status < 500) {
        setFormError('Invalid Data, please check your data and try again')
      } else {
        setFormError('Server Error, we could not complete your request')
      }
    } else if (err instanceof Error) {
      setFormError(`${err.message}`)
    } else {
      setFormError('Server Connection Error, please try again later')
    }
  }

  return {
    formError,
    clearFormError,
    handleFormError
  }
}
