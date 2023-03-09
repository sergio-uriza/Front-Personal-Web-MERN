import { useState } from 'react'

type UseModalComponentType = {
  showModal: boolean
  handleOpenModal: () => void
  handleCloseModal: () => void
}

export const useModalComponent = (): UseModalComponentType => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleOpenModal = (): void => { setShowModal(true) }
  const handleCloseModal = (): void => { setShowModal(false) }

  return {
    showModal,
    handleOpenModal,
    handleCloseModal
  }
}
