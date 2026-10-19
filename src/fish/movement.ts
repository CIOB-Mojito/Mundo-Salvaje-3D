import * as THREE from 'three'
import type { Fish } from './fish'

export function updateFish(fishes: Fish[], delta: number): void {
  for (const f of fishes) {
    f.phase += delta * 6

    const direction = new THREE.Vector3().subVectors(f.target, f.mesh.position)
    const dist = direction.length()
    if (dist < 0.8) {
      f.target.set(
        f.bounds.minX + Math.random() * (f.bounds.maxX - f.bounds.minX),
        f.bounds.minY + Math.random() * (f.bounds.maxY - f.bounds.minY),
        f.bounds.minZ + Math.random() * (f.bounds.maxZ - f.bounds.minZ),
      )
    }
    direction.normalize()
    const look = direction.clone()
    const current = f.mesh.getWorldDirection(new THREE.Vector3())
    look.lerp(current, 1 - f.turnSpeed * delta)
    f.mesh.lookAt(f.mesh.position.clone().add(look))

    f.mesh.position.addScaledVector(look, f.speed * delta)

    if (f.mesh.position.x < f.bounds.minX) f.mesh.position.x = f.bounds.minX
    if (f.mesh.position.x > f.bounds.maxX) f.mesh.position.x = f.bounds.maxX
    if (f.mesh.position.z < f.bounds.minZ) f.mesh.position.z = f.bounds.minZ
    if (f.mesh.position.z > f.bounds.maxZ) f.mesh.position.z = f.bounds.maxZ
    if (f.mesh.position.y < f.bounds.minY) f.mesh.position.y = f.bounds.minY
    if (f.mesh.position.y > f.bounds.maxY) f.mesh.position.y = f.bounds.maxY

    const t = f.phase
    const tailMesh = f.tail.children[0] as THREE.Mesh
    tailMesh.rotation.y = Math.sin(t) * 0.9
    tailMesh.rotation.z = Math.cos(t * 0.7) * 0.25
    tailMesh.rotation.x = Math.sin(t * 0.5) * 0.12

    f.dorsal.rotation.z = -0.15 + Math.sin(t * 1.2) * 0.1
    f.anal.rotation.z = 0.25 + Math.cos(t * 1.1) * 0.08
    f.leftPec.rotation.z = 0.3 + Math.sin(t * 1.5) * 0.12
    f.rightPec.rotation.z = 0.3 - Math.sin(t * 1.5) * 0.12
  }
}
