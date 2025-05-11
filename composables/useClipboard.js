export const useClipboard = () => {
  const copied = ref(false)

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      setTimeout(() => (copied.value = false), 3000)
    } catch (e) {
      console.error('Clipboard error', e)
    }
  }

  return { copied, copy }
}
