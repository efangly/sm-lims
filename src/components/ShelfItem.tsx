import { Html } from '@react-three/drei'

interface ShelfItemData {
  id: string
  name: string
  type: string
  status: 'available' | 'in-use' | 'maintenance'
  quantity?: number
}

interface Props {
  item: ShelfItemData
  position: [number, number, number]
  isZoomed: boolean
}

export function ShelfItem({ item, position, isZoomed }: Props) {
  const getStatusColor = (status: ShelfItemData['status']) => {
    switch (status) {
      case 'available':
        return '#10b981' // green
      case 'in-use':
        return '#3b82f6' // blue
      case 'maintenance':
        return '#f59e0b' // orange
      default:
        return '#6b7280' // gray
    }
  }

  const getStatusText = (status: ShelfItemData['status']) => {
    switch (status) {
      case 'available':
        return 'พร้อมใช้'
      case 'in-use':
        return 'กำลังใช้งาน'
      case 'maintenance':
        return 'ซ่อมบำรุง'
      default:
        return 'ไม่ทราบสถานะ'
    }
  }

  const statusColor = getStatusColor(item.status)
  const statusText = getStatusText(item.status)

  return (
    <group position={position}>
      {/* 3D Box representing the item */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.25, 0.25]} />
        <meshStandardMaterial 
          color={statusColor} 
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* HTML Label - Only show when zoomed */}
      {isZoomed && (
        <Html
          center
          distanceFactor={4}
          position={[0, 0.1, 0]}
          style={{ pointerEvents: 'auto' }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.95) 100%)',
              color: '#fff',
              padding: '6px 8px',
              fontSize: 8,
              borderRadius: 6,
              whiteSpace: 'nowrap',
              border: `1px solid ${statusColor}`,
              boxShadow: `0 2px 12px ${statusColor}40`,
              minWidth: 85,
              cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = `0 4px 20px ${statusColor}60`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = `0 2px 12px ${statusColor}40`
          }}
        >
          <div style={{ marginBottom: 3 }}>
            <div style={{ 
              fontWeight: 600, 
              fontSize: 8,
              marginBottom: 1,
              color: statusColor 
            }}>
              {item.name}
            </div>
            <div style={{ 
              fontSize: 6, 
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: 3
            }}>
              {item.type}
            </div>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 4,
            fontSize: 6
          }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: statusColor,
                boxShadow: `0 0 8px ${statusColor}`,
              }}
            />
            <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              {statusText}
            </span>
          </div>
          {item.quantity && (
            <div style={{ 
              marginTop: 3,
              paddingTop: 3,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: 6,
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              จำนวน: {item.quantity} หน่วย
            </div>
          )}
          </div>
        </Html>
      )}
    </group>
  )
}
