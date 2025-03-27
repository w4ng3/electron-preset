import { Buffer } from 'node:buffer'
import { join } from 'node:path'
import process from 'node:process'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import * as HID from 'node-hid'
import icon from '../../resources/icon.png?asset'

// 存储已打开的 HID 设备实例
const hidDevices: Record<string, HID.HID> = {}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  }
  else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // 获取 HID 设备列表
  ipcMain.handle('get-hid-devices', async () => {
    try {
      // const devices = await HID.devicesAsync(0x2717, 0x5086)
      const devices = await HID.devicesAsync()
      console.log('devices ----- :>> ', devices)
      // 根据 vendorId 和 productId 获取设备
      // const devices = HID.devices(0x2717, 0x5086)
      return devices
    }
    catch (error) {
      console.error('Error getting HID devices:', error)
      return []
    }
  })

  // 打开 HID 设备
  ipcMain.handle('open-hid-device', async (_, devicePath) => {
    console.log('open-hid-device======', devicePath)
    try {
      if (!hidDevices[devicePath]) {
        const device = await HID.HIDAsync.open(devicePath)
        // 创建一个新的 HID 设备实例
        hidDevices[devicePath] = new HID.HID(devicePath)
        console.log(`已打开设备: ${device}`)
      }
      return true
    }
    catch (error) {
      console.error(`打开设备失败 ${devicePath}:`, error)
      return false
    }
  })

  // 通过 vendorId 和 productId 打开 HID 设备
  ipcMain.handle('open-hid-device-by-id', async (_, vendorId, productId) => {
    try {
      const deviceKey = `${vendorId}-${productId}`
      if (!hidDevices[deviceKey]) {
        // 创建一个新的 HID 设备实例
        hidDevices[deviceKey] = new HID.HID(vendorId, productId)
        console.log(`已打开设备: vendorId=${vendorId}, productId=${productId}`)
      }
      return true
    }
    catch (error) {
      console.error(`打开设备失败 vendorId=${vendorId}, productId=${productId}:`, error)
      return false
    }
  })

  // 向设备发送数据
  ipcMain.handle('write-hid-device', (_, devicePath, data) => {
    try {
      if (hidDevices[devicePath]) {
        const buffer = Buffer.from(data)
        hidDevices[devicePath].write(buffer)
        console.log('写入设备成功----- :>> ', buffer)
        return true
      }
      return false
    }
    catch (error) {
      console.error(`写入设备数据失败 ${devicePath}:`, error)
      return false
    }
  })

  // 关闭设备
  ipcMain.handle('close-hid-device', (_, devicePath) => {
    try {
      if (hidDevices[devicePath]) {
        hidDevices[devicePath].close()
        delete hidDevices[devicePath]
        console.log(`已关闭设备: ${devicePath}`)
        return true
      }
      return false
    }
    catch (error) {
      console.error(`关闭设备失败 ${devicePath}:`, error)
      return false
    }
  })

  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
