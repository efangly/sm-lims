import type { ThreeElements } from '@react-three/fiber'
import type { DeviceStatus } from '../types/device'

type Props = ThreeElements['mesh'] & {
  status: DeviceStatus
}

export function IoTDevice({ status, ...props }: Props) {
  const color =
    status === 'online'
      ? '#00e676'
      : status === 'warning'
      ? '#ff9800'
      : '#9e9e9e'

  return (
    <mesh {...props}>
      <boxGeometry args={[0.3, 0.2, 0.2]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
