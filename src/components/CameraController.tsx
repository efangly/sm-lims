import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export function CameraController({
  focus
}: {
  focus: THREE.Vector3 | null
}) {
  const { camera } = useThree()
  const controls = useRef<any>(null)

  const target = useRef(new THREE.Vector3())
  const camPos = useRef(new THREE.Vector3())

  useFrame(() => {
    if (!focus || !controls.current) return

    camera.position.lerp(camPos.current, 0.1)
    controls.current.target.lerp(target.current, 0.1)
    controls.current.update()
  })

  if (focus) {
    target.current.copy(focus)
    camPos.current.copy(focus).add(new THREE.Vector3(0, 2, 4))
  }

  return <OrbitControls ref={controls} enableDamping />
}
