# Modules

一个自定义的用户模块系统。放置一个带有以下模板的 `.ts` 文件，它将自动安装。

```ts
import type { App } from 'vue'

export const install = (app: App) => {
  // do something
  app.use()
}
```
