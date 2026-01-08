import { create } from 'zustand'
import * as THREE from 'three'

interface FocusState {
  focus: THREE.Vector3 | null
  setFocus: (pos: THREE.Vector3 | null) => void
}

export const useFocusStore = create<FocusState>((set) => ({
  focus: null,
  setFocus: (pos) => set({ focus: pos })
}))
