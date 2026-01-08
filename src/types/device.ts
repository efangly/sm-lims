
export type DeviceStatus = 'online' | 'offline' | 'warning'

export interface IoTDeviceData {
  id: string
  name: string
  value: number
  unit: string
  status: DeviceStatus
}
