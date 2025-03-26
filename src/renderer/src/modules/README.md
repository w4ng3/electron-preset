## Modules

A custom user module system. Place a `.ts` file with the following template, it will be installed automatically.

```ts
import type { App } from 'vue'

export const install = (app: App) => {
  // do something
}
```
