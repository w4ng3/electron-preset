import type { App } from 'vue'
import { createPinia } from 'pinia'

// Setup Pinia
// https://pinia.vuejs.org/
export const install = (app: App) => {
  const pinia = createPinia()
  app.use(pinia)
}
