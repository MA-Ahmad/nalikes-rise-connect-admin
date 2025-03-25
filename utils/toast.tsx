import toast from 'react-hot-toast'

export const showToast = {
  success: (message: string) => {
    toast.success(message)
  },
  error: (message: string) => {
    toast.error(message)
  },
  loading: (message: string) => {
    return toast.loading(message)
  },
  dismiss: (toastId: string) => {
    toast.dismiss(toastId)
  },
  promise: (
    promise: Promise<unknown>,
    messages: { loading: string; success: string; error: string }
  ) => {
    return toast.promise(promise, {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'Error occurred',
    })
  },
}
