import { useCallback } from 'react'
import { DropzoneInputProps, DropzoneRootProps, useDropzone } from 'react-dropzone'

type UseDropzoneImageType = {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T
}

export const useDropzoneImage = (
  onDrop: (acceptedFiles: File[]) => void
): UseDropzoneImageType => {
  const onDropAccepted = useCallback((): void => {
    console.log('Archivo Cargado Correctamente')
  }, [])

  const onDropRejected = useCallback((): void => {
    console.log('Archivo No Admitido')
  }, [])

  const onError = useCallback((): void => {
    console.log('Ocurrio Algun Error')
  }, [])

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
