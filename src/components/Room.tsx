import { Cabinet } from './Cabinet'
import { useFocusStore } from '../store/focus.store'
import { colors } from '../tokens/colors'

export function Room() {
  const setFocus = useFocusStore((s) => s.setFocus)

  const roomWidth = 12
  const roomDepth = 10
  const wallHeight = 4
  const wallThickness = 0.2

  return (
    <group>
      {/* Floor (click to reset focus) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        onClick={() => setFocus(null)}
        receiveShadow
      >
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color={colors.floor} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, wallHeight / 2 - 1.5, -roomDepth / 2]} receiveShadow>
        <boxGeometry args={[roomWidth, wallHeight, wallThickness]} />
        <meshStandardMaterial color={colors.backWall} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-roomWidth / 2, wallHeight / 2 - 1.5, 0]} receiveShadow>
        <boxGeometry args={[wallThickness, wallHeight, roomDepth]} />
        <meshStandardMaterial color={colors.leftWall} />
      </mesh>

      {/* Cabinets */}
      <Cabinet cabinetId="cab-1" position={[-4, 0, -4]} />
      <Cabinet cabinetId="cab-2" position={[0, 0, -4]} />
      <Cabinet cabinetId="cab-3" position={[4, 0, -4]} />
    </group>
  )
}
