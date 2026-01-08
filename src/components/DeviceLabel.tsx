import { Html } from '@react-three/drei'

interface Props {
  name: string
  value: number
  unit: string
}

export function DeviceLabel({ name, value, unit }: Props) {
  return (
    <Html center distanceFactor={8}>
      <div
        style={{
          background: '#111',
          color: '#0f0',
          padding: '4px 6px',
          fontSize: 12,
          borderRadius: 4,
          whiteSpace: 'nowrap'
        }}
      >
        {name}: {value} {unit}
      </div>
    </Html>
  )
}
