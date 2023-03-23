import { useCallback } from 'react'
import { useSnackbar } from 'notistack'
import { DropzoneInputProps, DropzoneRootProps, useDropzone } from 'react-dropzone'

type UseDropzoneImageType = {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T
}

export const useDropzoneImage = (
  onDrop: (acceptedFiles: File[]) => void
): UseDropzoneImageType => {
  const { enqueueSnackbar } = useSnackbar()

  const onDropAccepted = useCallback((): void => {
    enqueueSnackbar('File Uploaded Successfully', { variant: 'success' })
  }, [enqueueSnackbar])

  const onDropRejected = useCallback((): void => {
    enqueueSnackbar('File Not Supported', { variant: 'warning' })
  }, [enqueueSnackbar])

  const onError = useCallback((): void => {
    enqueueSnackbar('Failed to Upload File', { variant: 'warning' })
  }, [enqueueSnackbar])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropAccepted,
    onDropRejected,
    onError,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpeg', '.jpg']
    },
    multiple: false,
    maxFiles: 1,
    maxSize: 600000
  })

  return {
    getRootProps,
    getInputProps
  }
}
