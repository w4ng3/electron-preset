<script setup lang="ts">
import { reactive } from 'vue'

const versions = reactive({ ...window.electron.process.versions })

const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div mt-10>
    <p class="tip">
      Please try pressing <code>F12</code> to open the devTool
    </p>

    <div class="flex justify-center">
      <div class="action">
        <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
      </div>
      <div class="action">
        <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
      </div>
    </div>
  </div>
  <ul class="versions">
    <li class="electron-version">
      Electron v{{ versions.electron }}
    </li>
    <li class="chrome-version">
      Chromium v{{ versions.chrome }}
    </li>
    <li class="node-version">
      Node v{{ versions.node }}
    </li>
  </ul>
</template>

<style scoped>
.versions {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  padding: 15px 0;
  font-family: 'Menlo', 'Lucida Console', monospace;
  display: inline-flex;
  overflow: hidden;
  align-items: center;
  border-radius: 22px;
  background-color: #202127;
  backdrop-filter: blur(24px);
}

.versions li {
  display: block;
  float: left;
  border-right: 1px solid var(--ev-c-gray-1);
  padding: 0 20px;
  font-size: 14px;
  line-height: 14px;
  opacity: 0.8;
  &:last-child {
    border: none;
  }
}
</style>
