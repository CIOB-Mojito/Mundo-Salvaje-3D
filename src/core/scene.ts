import * as THREE from 'three'

export interface World {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
}

export function createWorld(container: HTMLElement): World {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a2a4a)
  scene.fog = new THREE.FogExp2(0x0a2a4a, 0.045)

  const camera = new THREE.PerspectiveCamera(
    55,
    container.clientWidth / container.clientHeight,
    0.1,
    200,
  )
  camera.position.set(0, 4, 12)
  camera.lookAt(0, 1, 0)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1
  container.appendChild(renderer.domElement)

  addLights(scene)

  return { scene, camera, renderer }
}

function addLights(scene: THREE.Scene): void {
  const ambient = new THREE.AmbientLight(0x6090c0, 0.7)
  scene.add(ambient)

  const hemisphere = new THREE.HemisphereLight(0x88bbff, 0x445533, 0.5)
  scene.add(hemisphere)

  const directional = new THREE.DirectionalLight(0xddeeff, 0.9)
  directional.position.set(4, 12, 6)
  scene.add(directional)
}

export function handleResize(world: World, container: HTMLElement): void {
  const width = container.clientWidth
  const height = container.clientHeight
  world.camera.aspect = width / height
  world.camera.updateProjectionMatrix()
  world.renderer.setSize(width, height)
}
