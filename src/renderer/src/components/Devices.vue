<script lang="ts" setup>
import type { Device as HidDevice } from 'node-hid'
import { onMounted, ref } from 'vue'

const devices = ref<HidDevice[]>([])
const openDevices = ref<Record<string, boolean>>({})
const operationStatus = ref<Record<string, string>>({})

const loadDevices = async (): Promise<void> => {
  try {
    devices.value = await window.api.getHidDevices()
    console.log('devices ???:>> ', devices.value)
  }
  catch (error) {
    console.error('Error loading HID devices:', error)
  }
}

const openDevice = async (device: HidDevice): Promise<void> => {
  try {
    let success = false
    if (device.path) {
      success = await window.api.openHidDevice(device.path)
      operationStatus.value[device.path] = success ? '设备已打开' : '打开设备失败'
      openDevices.value[device.path] = success
    }
    else if (device.vendorId !== undefined && device.productId !== undefined) {
      success = await window.api.openHidDeviceById(device.vendorId, device.productId)
      const deviceKey = `${device.vendorId}-${device.productId}`
      operationStatus.value[deviceKey] = success ? '设备已打开' : '打开设备失败'
      openDevices.value[deviceKey] = success
    }
    else {
      operationStatus.value.error = '无效的设备信息'
    }
  }
  catch (error) {
    console.error('Error opening HID device:', error)
    operationStatus.value[device.path || 'error'] = '打开设备出错'
  }
}

const sendTestData = async (device: HidDevice): Promise<void> => {
  try {
    if (!device.path) {
      operationStatus.value.error = '设备没有路径信息'
      return
    }

    // 示例：发送一些测试数据（这里是一个简单的示例，实际使用时需要根据设备协议定制）
    const data = [0xA5, 0x5A, 0xFC, 0x30, 0x02, 0x01, 0x01, 0x16]
    const success = await window.api.writeHidDevice(device.path, data)
    operationStatus.value[device.path] = success ? '已发送测试数据' : '发送数据失败'
  }
  catch (error) {
    console.error('Error sending data to HID device:', error)
    operationStatus.value[device.path || 'error'] = '发送数据出错'
  }
}

const closeDevice = async (device: HidDevice): Promise<void> => {
  try {
    if (!device.path) {
      operationStatus.value.error = '设备没有路径信息'
      return
    }

    const success = await window.api.closeHidDevice(device.path)
    operationStatus.value[device.path] = success ? '设备已关闭' : '关闭设备失败'
    if (success) {
      openDevices.value[device.path] = false
    }
  }
  catch (error) {
    console.error('Error closing HID device:', error)
    operationStatus.value[device.path || 'error'] = '关闭设备出错'
  }
}

const getDeviceKey = (device: HidDevice): string => {
  return device.path || `${device.vendorId}-${device.productId}` || 'unknown'
}

onMounted(() => {
  loadDevices()
})
</script>

<template>
  <div class="devices-container">
    <h2>HID 设备列表</h2>
    <button class="refresh-btn" @click="loadDevices">
      刷新设备列表
    </button>
    <div v-if="devices.length === 0" class="no-devices">
      未检测到 HID 设备
    </div>
    <div v-else class="devices-list">
      <div v-for="device in devices" :key="getDeviceKey(device)" class="device-item">
        <h3>{{ device.product || '未知设备' }}</h3>
        <div class="device-details">
          <p>制造商: {{ device.manufacturer || '未知' }}</p>
          <p>供应商 ID: {{ device.vendorId }}</p>
          <p>产品 ID: {{ device.productId }}</p>
          <p>接口: {{ device.interface }}</p>
          <p>路径: {{ device.path || '无路径' }}</p>
          <p>usage: {{ device.usage?.toString(16) }}</p>
          <p>usagePage: {{ device.usagePage?.toString(16) }}</p>

          <div class="device-status">
            <p v-if="device.path && operationStatus[device.path]" class="status-message">
              状态: {{ operationStatus[device.path] }}
            </p>
          </div>

          <div class="device-actions">
            <button @click="openDevice(device)">
              打开设备
            </button>
            <button
              :disabled="!device.path || !openDevices[device.path]"
              @click="sendTestData(device)"
            >
              发送测试数据
            </button>
            <button
              :disabled="!device.path || !openDevices[device.path]"
              @click="closeDevice(device)"
            >
              关闭设备
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.devices-container {
  padding: 20px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: pink;
}

.no-devices {
  text-align: center;
  color: #666;
  margin-top: 20px;
}

.devices-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 100px);
  padding-right: 10px;
}

.device-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;
}

.device-item h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.device-details {
  font-size: 14px;
  color: #666;
}

.device-details p {
  margin: 5px 0;
}

.refresh-btn {
  padding: 8px 16px;
  margin-bottom: 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.refresh-btn:hover {
  background-color: #45a049;
}

.device-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.device-actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #2196f3;
  color: white;
}

.device-actions button:hover {
  background-color: #0b7dda;
}

.device-actions button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.status-message {
  font-weight: bold;
  color: #333;
  margin-top: 10px;
}
</style>
