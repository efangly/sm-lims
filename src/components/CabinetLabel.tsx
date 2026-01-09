import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useFocusStore } from '../store/focus.store'

interface Props {
  name: string
  cabinetId: string
  position: THREE.Vector3
  shelfPositions: THREE.Vector3[]
}

export function CabinetLabel({ name, cabinetId, position, shelfPositions }: Props) {
  const setCabinetFocus = useFocusStore((s) => s.setCabinetFocus)
  const cabinetFocus = useFocusStore((s) => s.cabinetFocus)
  
  const isActive = cabinetFocus?.cabinetId === cabinetId

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCabinetFocus({
      cabinetId,
      position,
      shelfPositions,
      currentShelf: 0
    })
  }

  return (
    <Html center distanceFactor={10} style={{ pointerEvents: 'auto' }}>
      <div
        onClick={handleClick}
        style={{
          background: isActive 
            ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' 
            : 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
          color: '#fff',
          padding: '8px 16px',
          fontSize: 14,
          fontWeight: 600,
          borderRadius: 8,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          border: isActive ? '2px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: isActive 
            ? '0 4px 20px rgba(59, 130, 246, 0.5)' 
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.2s ease',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(31, 41, 55, 0.98) 0%, rgba(55, 65, 81, 0.98) 100%)'
            e.currentTarget.style.transform = 'scale(1.05)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)'
            e.currentTarget.style.transform = 'scale(1)'
          }
        }}
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
        </svg>
        {name}
      </div>
    </Html>
  )
}
