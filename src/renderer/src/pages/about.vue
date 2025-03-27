<script lang="ts" setup>
const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div mt-10>
    <p>
      Please try pressing <code>F12</code> to open the devTool
    </p>

    <Devices />

    <div class="flex justify-center">
      <div class="action">
        <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
      </div>
      <div class="action">
        <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
      </div>
    </div>
  </div>
</template>
