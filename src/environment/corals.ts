import * as THREE from 'three'

export function createCorals(): THREE.Group {
  const group = new THREE.Group()
  const mat = new THREE.MeshStandardMaterial({
    color: 0xff6f61,
    roughness: 0.6,
    emissive: 0x662222,
    emissiveIntensity: 0.15,
    flatShading: true,
  })

  for (let i = 0; i < 6; i++) {
    const pos = new THREE.Vector3(
      (Math.random() - 0.5) * 12,
      0.2,
      (Math.random() - 0.5) * 8,
    )
    const branches = 3 + Math.floor(Math.random() * 3)
    for (let b = 0; b < branches; b++) {
      const geo = new THREE.ConeGeometry(0.15, 1.2, 6)
      geo.rotateX(Math.random() * 0.5)
      geo.rotateY(Math.random() * 0.5)
      geo.translate(0, 0.6, 0)
      const m = new THREE.Mesh(geo, mat.clone())
      ;(m.material as THREE.MeshStandardMaterial).color = new THREE.Color(
        0xff7f50 + Math.random() * 0x1000,
      )
      m.position.copy(pos).add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 1.5,
          0,
          (Math.random() - 0.5) * 1.5,
        ),
      )
      m.castShadow = false
      group.add(m)
    }
  }

  return group
}
