<script setup lang="ts">
import { Person } from '@w4ng3/common'

defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()

const name = ref(user.savedName)

const router = useRouter()
function go() {
  if (name.value) {
    router.push(`/hi/${encodeURIComponent(name.value)}`)
  }
}

const { t } = useI18n()
const p = new Person('Junmping', 'math')
</script>

<template>
  <div>
    <div flex justify-between>
      <img alt="logo" class="size-24" src="@assets/imgs/svgs/electron.svg">
      <img alt="logo" class="size-24" src="@assets/imgs/svgs/vite.svg">
    </div>

    <div class="text-3xl font-mono mt-3">
      <span class="vue">Electron-</span>
      <span class="ts">Vitesse</span>
    </div>

    <div> {{ `${p.name}:${p.slogan}` }}</div>

    <div py-4 />

    <TheInput
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      autocomplete="false"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button text-sm m-3 btn :disabled="!name" @click="go">
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
