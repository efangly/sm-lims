import { create } from 'zustand'
import * as THREE from 'three'

interface CabinetFocus {
  cabinetId: string
  position: THREE.Vector3
  shelfPositions: THREE.Vector3[]
  currentShelf: number
}

interface FocusState {
  focus: THREE.Vector3 | null
  cabinetFocus: CabinetFocus | null
  setFocus: (pos: THREE.Vector3 | null) => void
  setCabinetFocus: (focus: CabinetFocus | null) => void
  setCurrentShelf: (shelfIndex: number) => void
  nextShelf: () => void
  prevShelf: () => void
}

export const useFocusStore = create<FocusState>((set, get) => ({
  focus: null,
  cabinetFocus: null,
  setFocus: (pos) => set({ focus: pos, cabinetFocus: null }),
  setCabinetFocus: (cabinetFocus) => {
    if (cabinetFocus) {
      set({ 
        cabinetFocus, 
        focus: cabinetFocus.shelfPositions[cabinetFocus.currentShelf] 
      })
    } else {
      set({ cabinetFocus: null, focus: null })
    }
  },
  setCurrentShelf: (shelfIndex) => {
    const { cabinetFocus } = get()
    if (cabinetFocus && shelfIndex >= 0 && shelfIndex < cabinetFocus.shelfPositions.length) {
      set({
        cabinetFocus: { ...cabinetFocus, currentShelf: shelfIndex },
        focus: cabinetFocus.shelfPositions[shelfIndex]
      })
    }
  },
  nextShelf: () => {
    const { cabinetFocus } = get()
    if (cabinetFocus) {
      const nextIndex = Math.min(cabinetFocus.currentShelf + 1, cabinetFocus.shelfPositions.length - 1)
      get().setCurrentShelf(nextIndex)
    }
  },
  prevShelf: () => {
    const { cabinetFocus } = get()
    if (cabinetFocus) {
      const prevIndex = Math.max(cabinetFocus.currentShelf - 1, 0)
      get().setCurrentShelf(prevIndex)
    }
  }
}))
