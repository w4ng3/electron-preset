import messages from '@intlify/unplugin-vue-i18n/messages'
// import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
// import { routes } from 'vue-router/auto-routes'

import App from './App.vue'
import 'virtual:uno.css'
import './assets/main.css'

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
})

const app = createApp(App)
app.use(i18n)

app.mount('#app')
