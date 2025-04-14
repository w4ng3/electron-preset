import type { Device as HidDevice } from 'node-hid'
import process from 'node:process'
import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  getHidDevices: (): Promise<HidDevice[]> => ipcRenderer.invoke('get-hid-devices'),
  openHidDevice: (devicePath: string): Promise<boolean> =>
    ipcRenderer.invoke('open-hid-device', devicePath),
  openHidDeviceById: (vendorId: number, productId: number): Promise<boolean> =>
    ipcRenderer.invoke('open-hid-device-by-id', vendorId, productId),
  writeHidDevice: (devicePath: string, data: number[]): Promise<boolean> =>
    ipcRenderer.invoke('write-hid-device', devicePath, data),
  closeHidDevice: (devicePath: string): Promise<boolean> =>
    ipcRenderer.invoke('close-hid-device', devicePath),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
