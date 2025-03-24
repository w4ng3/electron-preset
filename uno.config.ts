import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind4,
  transformerAttributifyJsx,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({}),
    presetWind4(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [transformerDirectives(), transformerAttributifyJsx(), transformerVariantGroup()],
  shortcuts: [],
  rules: [],
  theme: {},
})
