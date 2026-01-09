import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useEffect } from 'react'
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
  const isAnimating = useRef(false)

  useEffect(() => {
    if (focus) {
      isAnimating.current = true
      target.current.copy(focus)
      // Position camera closer to see the shelf better
      camPos.current.copy(focus).add(new THREE.Vector3(0, 0.5, 3))
    } else {
      isAnimating.current = true
      // Reset to default view
      target.current.set(0, 0, 0)
      camPos.current.set(6, 6, 12)
    }
  }, [focus])

  useFrame(() => {
    if (!controls.current || !isAnimating.current) return

    camera.position.lerp(camPos.current, 0.08)
    controls.current.target.lerp(target.current, 0.08)
    controls.current.update()

    // Stop animating when close enough
    const posDist = camera.position.distanceTo(camPos.current)
    const targetDist = controls.current.target.distanceTo(target.current)
    if (posDist < 0.01 && targetDist < 0.01) {
      isAnimating.current = false
    }
  })

  return <OrbitControls ref={controls} enableDamping maxPolarAngle={Math.PI / 2} />
}
