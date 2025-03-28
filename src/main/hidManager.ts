import { Buffer } from 'node:buffer'
import { ipcMain } from 'electron'
import * as HID from 'node-hid'

export class HIDManager {
  private static instance: HIDManager
  private hidDevices: Record<string, HID.HID> = {}

  private constructor() {
    this.initializeHandlers()
  }

  public static getInstance(): HIDManager {
    if (!HIDManager.instance) {
      HIDManager.instance = new HIDManager()
    }
    return HIDManager.instance
  }

  private initializeHandlers(): void {
    // 获取 HID 设备列表
    ipcMain.handle('get-hid-devices', () => this.getDevices())

    // 打开 HID 设备
    ipcMain.handle('open-hid-device', (_, devicePath) => this.openDevice(devicePath))

    // 通过 vendorId 和 productId 打开 HID 设备
    ipcMain.handle('open-hid-device-by-id', (_, vendorId, productId) =>
      this.openDeviceById(vendorId, productId))

    // 向设备发送数据
    ipcMain.handle('write-hid-device', (_, devicePath, data) =>
      this.writeToDevice(devicePath, data))

    // 关闭设备
    ipcMain.handle('close-hid-device', (_, devicePath) =>
      this.closeDevice(devicePath))
  }

  private async getDevices(): Promise<HID.Device[]> {
    try {
      const devices = await HID.devicesAsync()
      // console.log('devices ----- :>> ', devices)
      return devices
    }
    catch (error) {
      console.error('Error getting HID devices:', error)
      return []
    }
  }

  private async openDevice(devicePath: string): Promise<boolean> {
    console.log('open-hid-device======', devicePath)
    try {
      if (!this.hidDevices[devicePath]) {
        const device = await HID.HIDAsync.open(devicePath)
        this.hidDevices[devicePath] = new HID.HID(devicePath)
        console.log(`已打开设备: ${device}`)
      }
      return true
    }
    catch (error) {
      console.error(`打开设备失败 ${devicePath}:`, error)
      return false
    }
  }

  private async openDeviceById(vendorId: number, productId: number): Promise<boolean> {
    try {
      const deviceKey = `${vendorId}-${productId}`
      if (!this.hidDevices[deviceKey]) {
        this.hidDevices[deviceKey] = new HID.HID(vendorId, productId)
        console.log(`已打开设备: vendorId=${vendorId}, productId=${productId}`)
      }
      return true
    }
    catch (error) {
      console.error(`打开设备失败 vendorId=${vendorId}, productId=${productId}:`, error)
      return false
    }
  }

  private writeToDevice(devicePath: string, data: number[]): boolean {
    try {
      if (this.hidDevices[devicePath]) {
        const buffer = Buffer.from(data)
        this.hidDevices[devicePath].write(buffer)
        console.log('写入设备成功----- :>> ', buffer)
        return true
      }
      return false
    }
    catch (error) {
      console.error(`写入设备数据失败 ${devicePath}:`, error)
      return false
    }
  }

  private closeDevice(devicePath: string): boolean {
    try {
      if (this.hidDevices[devicePath]) {
        this.hidDevices[devicePath].close()
        delete this.hidDevices[devicePath]
        console.log(`已关闭设备: ${devicePath}`)
        return true
      }
      return false
    }
    catch (error) {
      console.error(`关闭设备失败 ${devicePath}:`, error)
      return false
    }
  }
}
