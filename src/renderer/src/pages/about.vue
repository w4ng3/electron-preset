<script lang="ts" setup>
const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div mt-10>
    <p>
      Please try pressing <code>F12</code> to open the devTool
    </p>

    <Devices />

    <div class="mt-4 flex gap-4 justify-center">
      <div class="p2 rounded-md bg-cyan cursor-pointer">
        <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
      </div>
      <div class="p2 rounded-md bg-cyan cursor-pointer">
        <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
      </div>
    </div>
  </div>
</template>
