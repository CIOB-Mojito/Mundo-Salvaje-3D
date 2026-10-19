import * as THREE from 'three'

export function createRocks(): THREE.Group {
  const group = new THREE.Group()
  const material = new THREE.MeshStandardMaterial({
    color: 0x6f6f6f,
    roughness: 0.9,
    flatShading: true,
  })

  for (let i = 0; i < 8; i++) {
    const scale = 0.4 + Math.random() * 1.2
    const geometry = new THREE.IcosahedronGeometry(scale * 0.8, 1)
    geometry.scale(1, 0.7 + Math.random() * 0.3, 1)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(
      (Math.random() - 0.5) * 16,
      (scale * 0.4) / 1,
      (Math.random() - 0.5) * 12,
    )
    mesh.castShadow = false
    mesh.receiveShadow = false
    group.add(mesh)
  }

  return group
}
