<script lang="ts" setup>
const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

const initWebHid = async () => {
  if ('hid' in navigator) {
    console.log('WebHID 支持 ✅')
    const filters = [
      { vendorId: 0x2717, productId: 0x5086 },
      { vendorId: 0x2717, productId: 0xD003 },
    ]

    navigator.hid.requestDevice({ filters }).then((devices) => {
      console.log('用户授权的设备: ', devices)
    })
  }
  else {
    console.warn('WebHID 不支持 ❌')
  }
}

onMounted(() => {
})
</script>

<template>
  <div mt-10>
    <p>
      Please try pressing <code>F12</code> to open the devTool
    </p>

    <Devices />

    <button p2 bg-red cursor-pointer @click="initWebHid">
      WEB-HID 搜设备
    </button>

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
