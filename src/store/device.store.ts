import { create } from 'zustand'
import type { IoTDeviceData } from '../types/device'

interface DeviceState {
  devices: Record<string, IoTDeviceData>
  updateDevice: (device: IoTDeviceData) => void
}

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: {},
  updateDevice: (device) =>
    set((state) => ({
      devices: {
        ...state.devices,
        [device.id]: device
      }
    }))
}))
