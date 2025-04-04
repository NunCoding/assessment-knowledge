import { createPinia } from 'pinia'
import piniaPersistedState from 'pinia-plugin-persistedstate'

export const pinia = createPinia()
pinia.use(piniaPersistedState)