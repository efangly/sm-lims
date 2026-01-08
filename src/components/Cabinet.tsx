import type { ThreeElements } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useFocusStore } from '../store/focus.store'
import { colors } from '../tokens/colors'

type Props = ThreeElements['group'] & {
  cabinetId: string
  color?: string // Allow custom color override
}

export function Cabinet({ cabinetId, color, ...props }: Props) {
  const ref = useRef<THREE.Group>(null!)
  const setFocus = useFocusStore((s) => s.setFocus)

  // Assign different colors to different cabinets if no custom color provided
  const getCabinetColor = () => {
    if (color) return color
    
    const cabinetColors = [
      colors.cabinet.primary,
      colors.cabinet.secondary,
      colors.cabinet.tertiary,
    ]
    const colorIndex = parseInt(cabinetId.split('-')[1]) - 1
    return cabinetColors[colorIndex % cabinetColors.length]
  }

  const cabinetColor = getCabinetColor()

  const handleClick = () => {
    const pos = new THREE.Vector3()
    ref.current.getWorldPosition(pos)
    setFocus(pos)
  }

  const cabinetWidth = 2
  const cabinetHeight = 3
  const cabinetDepth = 1
  const shelfThickness = 0.05
  const shelfCount = 3
  const wallThickness = 0.05

  return (
    <group
      ref={ref}
      {...props}
      onClick={(e) => {
        e.stopPropagation()
        handleClick()
      }}
    >
      {/* Back panel */}
      <mesh position={[0, 0, -cabinetDepth / 2 + wallThickness / 2]}>
        <boxGeometry args={[cabinetWidth, cabinetHeight, wallThickness]} />
        <meshBasicMaterial color={cabinetColor} />
      </mesh>

      {/* Left panel */}
      <mesh position={[-cabinetWidth / 2 + wallThickness / 2, 0, 0]}>
        <boxGeometry args={[wallThickness, cabinetHeight, cabinetDepth]} />
        <meshBasicMaterial color={cabinetColor} />
      </mesh>

      {/* Right panel */}
      <mesh position={[cabinetWidth / 2 - wallThickness / 2, 0, 0]}>
        <boxGeometry args={[wallThickness, cabinetHeight, cabinetDepth]} />
        <meshBasicMaterial color={cabinetColor} />
      </mesh>

      {/* Top panel */}
      <mesh position={[0, cabinetHeight / 2 - wallThickness / 2, 0]}>
        <boxGeometry args={[cabinetWidth, wallThickness, cabinetDepth]} />
        <meshBasicMaterial color={cabinetColor} />
      </mesh>

      {/* Bottom panel */}
      <mesh position={[0, -cabinetHeight / 2 + wallThickness / 2, 0]}>
        <boxGeometry args={[cabinetWidth, wallThickness, cabinetDepth]} />
        <meshBasicMaterial color={cabinetColor} />
      </mesh>

      {/* Shelves */}
      {Array.from({ length: shelfCount }).map((_, i) => {
        const shelfY = -cabinetHeight / 2 + ((i + 1) * cabinetHeight) / (shelfCount + 1)
        const shelfColor = new THREE.Color(cabinetColor).multiplyScalar(0.7).getHexString()
        
        return (
          <mesh key={i} position={[0, shelfY, 0]}>
            <boxGeometry args={[cabinetWidth - wallThickness * 2, shelfThickness, cabinetDepth - wallThickness]} />
            <meshBasicMaterial color={`#${shelfColor}`} />
          </mesh>
        )
      })}
    </group>
  )
}
