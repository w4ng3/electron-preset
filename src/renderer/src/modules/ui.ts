import type { App } from 'vue'
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { en, zhHans } from 'vuetify/locale'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3, // 默认使用 Material Design 3 的风格
  locale: {
    locale: 'zhHans',
    fallback: 'zhHans',
    messages: { zhHans, en },
  },
})

export const install = (app: App) => {
  app.use(vuetify)
}
