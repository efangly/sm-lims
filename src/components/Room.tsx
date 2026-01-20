import { Cabinet } from './Cabinet'
import { IoTDevice } from './IoTDevice'
import { useFocusStore } from '../store/focus.store'
import { colors } from '../tokens/colors'

export function Room() {
  const setCabinetFocus = useFocusStore((s) => s.setCabinetFocus)

  const roomWidth = 12
  const roomDepth = 10
  const wallHeight = 4
  const wallThickness = 0.2

  // Position for IoT devices on the left wall
  const leftWallX = -roomWidth / 2 + wallThickness / 2 + 0.06

  return (
    <group>
      {/* Floor (click to reset focus) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        onClick={() => setCabinetFocus(null)}
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

      {/* IoT Temperature Sensors on Left Wall */}
      <IoTDevice 
        deviceId="iot-temp-1"
        deviceName="Sensor 1"
        mqttBrokerUrl="wss://siamatic.co.th:8084/mqtt"
        mqttTopic="eTPV2-2P-L0168-1068-058/1/temp/real"
        position={[leftWallX, 0.5, -2]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <IoTDevice 
        deviceId="iot-temp-2"
        deviceName="Sensor 2"
        mqttBrokerUrl="wss://siamatic.co.th:8084/mqtt"
        mqttTopic="eTPV2-2P-L0168-1068-058/2/temp/real"
        position={[leftWallX, 0.5, 2]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Cabinets */}
      <Cabinet cabinetId="cab-1" cabinetName="Storage A" position={[-4, 0, -4]} />
      <Cabinet cabinetId="cab-2" cabinetName="Storage B" position={[0, 0, -4]} />
      <Cabinet cabinetId="cab-3" cabinetName="Storage C" position={[4, 0, -4]} />
    </group>
  )
}
