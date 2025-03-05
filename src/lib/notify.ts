import { toast } from 'vue3-toastify'

export const notify = (text: string, notifyTipe: string) => {
  if (notifyTipe === 'success') {
    toast.success(text, {
      autoClose: 2000,
      theme: 'light',
      dangerouslyHTMLString: true,
    })
  } else if (notifyTipe === 'error') {
    toast.error(text, {
      autoClose: 2000,
      theme: 'light',
      dangerouslyHTMLString: true,
    })
  }
}
