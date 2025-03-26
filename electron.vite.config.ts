import path, { resolve } from 'node:path'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// import Markdown from 'unplugin-vue-markdown/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'


export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [
      /** @see https://github.com/posva/unplugin-vue-router */
      VueRouter({
        extensions: ['.vue', '.md'],
        routesFolder: 'src/renderer/src/pages',
        dts: 'src/renderer/src/types/typed-router.d.ts',
      }),
      vue(), // ⚠️ Vue must be placed after VueRouter()
      UnoCSS(),
      vueJsx(),
      /** @see https://github.com/JohnCampionJr/vite-plugin-vue-layouts */
      Layouts(),
      /** @see https://github.com/antfu/unplugin-auto-import */
      AutoImport({
        imports: [
          'vue',
          'vue-i18n',
          '@vueuse/head',
          '@vueuse/core',
          VueRouterAutoImports,
          {
          // add any other imports you were relying on
            'vue-router/auto': ['useLink'],
          },
        ],
        dts: 'src/types/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/stores',
        ],
        vueTemplate: true,
      }),
      /** @see https://github.com/antfu/unplugin-vue-components */
      Components({
      // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/types/components.d.ts',
      }),
      /** @see https://github.com/intlify/unplugin-vue-i18n */
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'src/renderer/locales/**')],
      }),
      /** @see https://github.com/webfansplz/vite-plugin-vue-devtools */
      VueDevTools(),
    ],
    server: {
      open: false,
      proxy: {
        '/mock': {
          target: 'http://api.mock.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/mock/, ''),
        },
      },
    },
  },
})
