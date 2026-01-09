import type { ThreeElements } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFocusStore } from '../store/focus.store'
import { colors } from '../tokens/colors'
import { CabinetLabel } from './CabinetLabel'

type Props = ThreeElements['group'] & {
  cabinetId: string
  cabinetName?: string
  color?: string // Allow custom color override
}

export function Cabinet({ cabinetId, cabinetName, color, ...props }: Props) {
  const ref = useRef<THREE.Group>(null!)
  const setCabinetFocus = useFocusStore((s) => s.setCabinetFocus)

  const cabinetWidth = 2
  const cabinetHeight = 3
  const cabinetDepth = 1
  const shelfThickness = 0.05
  const shelfCount = 3
  const wallThickness = 0.05

  // Calculate shelf positions in world space
  const shelfPositions = useMemo(() => {
    const positions: THREE.Vector3[] = []
    const groupPos = props.position as [number, number, number] | undefined
    const baseX = groupPos?.[0] ?? 0
    const baseY = groupPos?.[1] ?? 0
    const baseZ = groupPos?.[2] ?? 0

    for (let i = 0; i < shelfCount; i++) {
      const shelfY = -cabinetHeight / 2 + ((i + 1) * cabinetHeight) / (shelfCount + 1)
      positions.push(new THREE.Vector3(baseX, baseY + shelfY, baseZ))
    }
    return positions
  }, [props.position, shelfCount, cabinetHeight])

  // Get cabinet world position for label
  const cabinetPosition = useMemo(() => {
    const groupPos = props.position as [number, number, number] | undefined
    return new THREE.Vector3(
      groupPos?.[0] ?? 0,
      groupPos?.[1] ?? 0,
      groupPos?.[2] ?? 0
    )
  }, [props.position])

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
    setCabinetFocus({
      cabinetId,
      position: cabinetPosition,
      shelfPositions,
      currentShelf: 0
    })
  }

  const displayName = cabinetName || `Cabinet ${cabinetId.split('-')[1]}`

  return (
    <group
      ref={ref}
      {...props}
      onClick={(e) => {
        e.stopPropagation()
        handleClick()
      }}
    >
      {/* Cabinet Label */}
      <group position={[0, cabinetHeight / 2 + 0.5, 0]}>
        <CabinetLabel 
          name={displayName}
          cabinetId={cabinetId}
          position={cabinetPosition}
          shelfPositions={shelfPositions}
        />
      </group>

      {/* Back panel */}
      <mesh position={[0, 0, -cabinetDepth / 2 + wallThickness / 2]} castShadow receiveShadow>
        <boxGeometry args={[cabinetWidth, cabinetHeight, wallThickness]} />
        <meshStandardMaterial color={cabinetColor} />
      </mesh>

      {/* Left panel */}
      <mesh position={[-cabinetWidth / 2 + wallThickness / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[wallThickness, cabinetHeight, cabinetDepth]} />
        <meshStandardMaterial color={cabinetColor} />
      </mesh>

      {/* Right panel */}
      <mesh position={[cabinetWidth / 2 - wallThickness / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[wallThickness, cabinetHeight, cabinetDepth]} />
        <meshStandardMaterial color={cabinetColor} />
      </mesh>

      {/* Top panel */}
      <mesh position={[0, cabinetHeight / 2 - wallThickness / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[cabinetWidth, wallThickness, cabinetDepth]} />
        <meshStandardMaterial color={cabinetColor} />
      </mesh>

      {/* Bottom panel */}
      {/* <mesh position={[0, -cabinetHeight / 2 + wallThickness / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[cabinetWidth, wallThickness, cabinetDepth]} />
        <meshStandardMaterial color={cabinetColor} />
      </mesh> */}

      {/* Shelves */}
      {Array.from({ length: shelfCount }).map((_, i) => {
        const shelfY = -cabinetHeight / 2 + ((i + 1) * cabinetHeight) / (shelfCount + 1)
        const shelfColor = new THREE.Color(cabinetColor).multiplyScalar(0.7).getHexString()
        
        return (
          <mesh key={i} position={[0, shelfY, 0]} castShadow receiveShadow>
            <boxGeometry args={[cabinetWidth - wallThickness * 2, shelfThickness, cabinetDepth - wallThickness]} />
            <meshStandardMaterial color={`#${shelfColor}`} />
          </mesh>
        )
      })}
    </group>
  )
}
