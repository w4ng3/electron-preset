<script setup lang="ts">
import { toggleTheme } from '@r/composables/dark'
import { useLocale, useTheme } from 'vuetify'

const { current } = useLocale()
const { t, locale, availableLocales: locales } = useI18n()
function toggleLocales() {
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  locale.value = newLocale
  // 修改 vuetify 组件语言
  current.value = newLocale
}

const vuetifyTheme = useTheme()
watch(isDark, (val) => {
  vuetifyTheme.global.name.value = val ? 'dark' : 'light'
}, { immediate: true })
</script>

<template>
  <nav flex="~ gap-4" text-xl mt-6 justify-center>
    <RouterLink text-teal-600 to="/" :title="t('button.home')">
      <div i-carbon-campsite />
    </RouterLink>

    <!-- <button
      border-none
      class="outline-transparent"
      icon-btn :title="t('button.toggle_dark')" @click="toggleDark()"
    >
      <div i="carbon-sun dark:carbon-moon" />
    </button> -->

    <button
      border-none
      class="outline-transparent"
      icon-btn :title="t('button.toggle_dark')" @click="toggleTheme"
    >
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <a icon-btn :title="t('button.toggle_langs')" @click="toggleLocales()">
      <div i-carbon-language />
    </a>

    <RouterLink icon-btn to="/about" :title="t('button.about')" data-test-id="about">
      <div i-carbon-dicom-overlay />
    </RouterLink>

    <a icon-btn rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank" title="GitHub">
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>
