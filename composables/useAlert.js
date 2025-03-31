export const useAlert = () => {
  const alertMessage = ref('')
  const alertType = ref('info')
  const showAlert = ref(false)
  const alertPosition = ref('top')

  const triggerAlert = (message, type = 'info', options = {}) => {
    alertMessage.value = message
    alertType.value = type
    alertPosition.value = options.position || 'top'
    showAlert.value = true
    
    // Auto-hide after timeout
    setTimeout(() => {
      showAlert.value = false
    }, options.timeout || 3000)
  }

  return {
    alertMessage,
    alertType,
    showAlert,
    alertPosition,
    triggerAlert
  }
}