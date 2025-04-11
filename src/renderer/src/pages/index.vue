<script setup lang="ts">
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
</script>

<template>
  <div>
    <img alt="logo" class="mx-a size-24" src="@r/assets/svgs/electron.svg">
    <div class="text-3xl font-mono mt-3">
      <span class="vue">Electron-</span>
      <span class="ts">Vitesse</span>
    </div>

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
