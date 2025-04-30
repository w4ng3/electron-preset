/// <reference types="vite/client" />
/// <reference types="@types/w3c-web-hid" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
