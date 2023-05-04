import { reactive } from 'vue'

export const state = reactive({
  isModalOpen: false as boolean,
  message: '' as string,
  title: '' as string,
  confirmMessage: '' as string,
  cancelMessage: '' as string,
  confirmTag: 'normal' as 'success' | 'danger' | 'info' | 'warning' | 'link' | 'normal',
  cancelTag: 'normal' as 'success' | 'danger' | 'info' | 'warning' | 'link' | 'normal',
  resolve: (x: any) => {},
  reject: (x: any) => {}
})

interface props {
  confirmMessage?: string
  cancelMessage?: string
  confirmTag?: 'success' | 'danger' | 'info' | 'warning' | 'link' | 'normal'
  cancelTag?: 'success' | 'danger' | 'info' | 'warning' | 'link' | 'normal'
}
export function openModal(message: string, title: string, props?: props) {
  state.isModalOpen = true
  state.message = message
  state.title = title
  if (props) {
    if (props.confirmMessage) {
      state.confirmMessage = props.confirmMessage
    }
    if (props.cancelMessage) {
      state.cancelMessage = props.cancelMessage
    }
    if (props.confirmTag) {
      state.confirmTag = props.confirmTag
    }
    if (props.cancelTag) {
      state.cancelTag = props.cancelTag
    }
  }
}

export function closeModal() {
  state.isModalOpen = false
}

export function confirm(message: string, title: string, props?: props) {
  return new Promise((resolve, reject) => {
    openModal(message, title, props)

    state.resolve = resolve
    state.reject = reject
  }).finally(() => {
    state.isModalOpen = false
  })
}
