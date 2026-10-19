import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { World } from './scene'

export function createControls(world: World): OrbitControls {
  const controls = new OrbitControls(world.camera, world.renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.enablePan = false
  controls.minDistance = 6
  controls.maxDistance = 18
  controls.minPolarAngle = Math.PI * 0.15
  controls.maxPolarAngle = Math.PI * 0.55
  controls.minAzimuthAngle = -Math.PI * 0.6
  controls.maxAzimuthAngle = Math.PI * 0.6
  controls.target.set(0, 1.5, 0)
  controls.update()
  return controls
}
