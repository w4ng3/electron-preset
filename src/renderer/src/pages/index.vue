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
      <v-btn text-white mt-4 bg-teal-700 cursor-pointer class="bg-red-300" :disabled="!name" @click="go">
        {{ t('button.go') }}
      </v-btn>
    </div>

    <v-dialog max-width="500">
      <template #activator="{ props: activatorProps }">
        <v-btn
          mt-4
          v-bind="activatorProps"
          color="surface-variant"
          text="Open Dialog"
          variant="flat"
        />
      </template>

      <template #default="{ isActive }">
        <v-card title="Dialog">
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn
              text="Close Dialog"
              @click="isActive.value = false"
            />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>


<style scoped>

</style>
