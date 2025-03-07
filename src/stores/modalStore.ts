import { defineStore } from 'pinia'

interface ModalState {
  isOpenModal: boolean
  typeModal: string
  imageSource: string
  message: string
}

export const useModalStore = defineStore('modal', {
  state: (): ModalState => ({
    isOpenModal: false,
    typeModal: '',
    imageSource: '',
    message: '',
  }),

  actions: {
    openModal() {
      this.isOpenModal = true
    },

    closeModal() {
      this.isOpenModal = false
    },

    toggleModal() {
      this.isOpenModal = !this.isOpenModal
    },

    typeOfModal(modalType: string) {
      this.typeModal = modalType
    },

    setSourceImage(imageSrc: string) {
      this.imageSource = imageSrc
    },
  },
})
