import * as THREE from 'three'

export function createParticles(): THREE.Group {
  const group = new THREE.Group()
  const count = 80
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 18
    positions[i * 3 + 1] = Math.random() * 6 + 1
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const mat = new THREE.PointsMaterial({
    color: 0xa0c8ff,
    size: 0.08,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  })
  const points = new THREE.Points(geo, mat)
  group.add(points)

  return group
}
