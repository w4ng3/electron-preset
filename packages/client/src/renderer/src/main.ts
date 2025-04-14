import type { App } from 'vue'
import { createApp } from 'vue'
import MyApp from './App.vue'
import 'virtual:uno.css'
import './assets/styles/main.css'


const app = createApp(MyApp)
// 自动导入模块
const modules = import.meta.glob<{ install: (app: App) => void }>('./modules/*.ts', { eager: true })
Object.entries(modules).forEach(([_key, value]) => {
  value.install?.(app)
})

app.mount('#app')
