<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
// const user = useUserStore()
const name = ref('')

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
    <img alt="logo" class="mx-a size-24" src="../assets/svgs/electron.svg">
    <div class="">
      Electron Vitesse
    </div>
    <div class="text-2xl">
      Build an Electron app with
      <span class="vue">Vue</span>
      and
      <span class="ts">TypeScript</span>
    </div>


    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <TheInput
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      autocomplete="false"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        text-sm
        m-3
        btn
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
