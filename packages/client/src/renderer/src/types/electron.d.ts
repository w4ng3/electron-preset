interface HidDevice {
  vendorId: number
  productId: number
  path: string
  manufacturer: string
  product: string
  release: number
  interface: number
  usagePage: number
  usage: number
}

interface Api {
  getHidDevices: () => Promise<HidDevice[]>
  openHidDevice: (devicePath: string) => Promise<boolean>
  openHidDeviceById: (vendorId: number, productId: number) => Promise<boolean>
  writeHidDevice: (devicePath: string, data: number[]) => Promise<boolean>
  closeHidDevice: (devicePath: string) => Promise<boolean>
}

interface Window {
  api: Api
}
