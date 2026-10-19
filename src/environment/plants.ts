import * as THREE from 'three'

export function createPlants(): THREE.Group {
  const group = new THREE.Group()
  const material = new THREE.MeshStandardMaterial({
    color: 0x3c9b4d,
    roughness: 0.8,
    flatShading: true,
  })

  for (let i = 0; i < 12; i++) {
    const height = 1.5 + Math.random() * 2.5
    const geo = new THREE.ConeGeometry(0.12, height, 5)
    geo.translate(0, height / 2, 0)
    const mesh = new THREE.Mesh(geo, material)
    mesh.position.set(
      (Math.random() - 0.5) * 14,
      0,
      (Math.random() - 0.5) * 10,
    )
    mesh.rotation.y = Math.random() * Math.PI * 2
    mesh.castShadow = false
    group.add(mesh)
  }

  return group
}
