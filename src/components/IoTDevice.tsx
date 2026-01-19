import { Html } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import type { ThreeElements } from '@react-three/fiber'

interface IoTDeviceProps extends Omit<ThreeElements['group'], 'ref'> {
  deviceId: string
  deviceName: string
  socketUrl?: string
}

interface TemperatureData {
  temperature: number
  humidity: number
  timestamp: Date
}

export function IoTDevice({ deviceId, deviceName, socketUrl, ...props }: IoTDeviceProps) {
  const [data, setData] = useState<TemperatureData>({
    temperature: 25.0,
    humidity: 60,
    timestamp: new Date()
  })
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<WebSocket | null>(null)

  // Simulate real-time data when no socket URL is provided
  useEffect(() => {
    if (socketUrl) {
      // Connect to real WebSocket
      try {
        socketRef.current = new WebSocket(socketUrl)
        
        socketRef.current.onopen = () => {
          setIsConnected(true)
          console.log(`IoT Device ${deviceId} connected to socket`)
        }

        socketRef.current.onmessage = (event) => {
          try {
            const newData = JSON.parse(event.data)
            setData({
              temperature: newData.temperature ?? data.temperature,
              humidity: newData.humidity ?? data.humidity,
              timestamp: new Date()
            })
          } catch (e) {
            console.error('Failed to parse socket data:', e)
          }
        }

        socketRef.current.onclose = () => {
          setIsConnected(false)
          console.log(`IoT Device ${deviceId} disconnected`)
        }

        socketRef.current.onerror = (error) => {
          console.error(`IoT Device ${deviceId} socket error:`, error)
          setIsConnected(false)
        }

        return () => {
          socketRef.current?.close()
        }
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error)
      }
    } else {
      // Simulate data updates every 2 seconds
      setIsConnected(true)
      const interval = setInterval(() => {
        setData({
          temperature: 24 + Math.random() * 4, // 24-28°C
          humidity: 55 + Math.random() * 15, // 55-70%
          timestamp: new Date()
        })
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [socketUrl, deviceId])

  const getTemperatureColor = (temp: number) => {
    if (temp < 20) return '#3b82f6' // blue - cold
    if (temp < 26) return '#10b981' // green - normal
    if (temp < 30) return '#f59e0b' // orange - warm
    return '#ef4444' // red - hot
  }

  const tempColor = getTemperatureColor(data.temperature)

  return (
    <group {...props}>
      {/* IoT Device Box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.4, 0.15]} />
        <meshStandardMaterial 
          color="#1f2937"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* LED Indicator */}
      <mesh position={[0.2, 0.12, 0.076]}>
        <circleGeometry args={[0.04, 16]} />
        <meshStandardMaterial 
          color={isConnected ? '#10b981' : '#ef4444'}
          emissive={isConnected ? '#10b981' : '#ef4444'}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Temperature Display Screen */}
      <mesh position={[0, 0, 0.076]}>
        <planeGeometry args={[0.4, 0.25]} />
        <meshStandardMaterial 
          color="#0f172a"
          roughness={0.1}
        />
      </mesh>

      {/* HTML Label */}
      <Html
        center
        distanceFactor={10}
        position={[0, 0.4, 0.15]}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
            color: '#fff',
            padding: '12px 16px',
            fontSize: 13,
            borderRadius: 12,
            whiteSpace: 'nowrap',
            border: `2px solid ${tempColor}`,
            boxShadow: `0 4px 20px ${tempColor}40`,
            minWidth: 160,
          }}
        >
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: 10,
            paddingBottom: 8,
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tempColor} strokeWidth="2">
                <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
              </svg>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{deviceName}</span>
            </div>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: isConnected ? '#10b981' : '#ef4444',
                boxShadow: `0 0 10px ${isConnected ? '#10b981' : '#ef4444'}`,
              }}
            />
          </div>

          {/* Temperature */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'baseline',
            justifyContent: 'center',
            marginBottom: 8
          }}>
            <span style={{ 
              fontSize: 32, 
              fontWeight: 700, 
              color: tempColor,
              fontFamily: 'monospace'
            }}>
              {data.temperature.toFixed(1)}
            </span>
            <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', marginLeft: 3 }}>°C</span>
          </div>

          {/* Humidity */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            fontSize: 13,
            color: 'rgba(255,255,255,0.7)'
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
            <span>ความชื้น: {data.humidity.toFixed(0)}%</span>
          </div>

          {/* Timestamp */}
          <div style={{ 
            marginTop: 8,
            paddingTop: 8,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: 11,
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center'
          }}>
            อัปเดต: {data.timestamp.toLocaleTimeString('th-TH')}
          </div>
        </div>
      </Html>
    </group>
  )
}
