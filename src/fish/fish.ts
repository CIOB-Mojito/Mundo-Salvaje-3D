import * as THREE from 'three'

export interface Fish {
  mesh: THREE.Group
  speed: number
  turnSpeed: number
  phase: number
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number; minY: number; maxY: number }
  target: THREE.Vector3
  body: THREE.Mesh
  tail: THREE.Group
  dorsal: THREE.Mesh
  anal: THREE.Mesh
  leftPec: THREE.Mesh
  rightPec: THREE.Mesh
}

function createOrganicBody(
  variant: 'A' | 'B' | 'C',
  bodyMat: THREE.MeshStandardMaterial,
): THREE.Mesh {
  const points: THREE.Vector2[] = []
  points.push(new THREE.Vector2(0, 0))
  points.push(new THREE.Vector2(0.06, 0.08))
  points.push(new THREE.Vector2(0.1, 0.16))
  points.push(new THREE.Vector2(0.14, 0.22))
  points.push(new THREE.Vector2(0.18, 0.26))
  points.push(new THREE.Vector2(0.22, 0.28))
  points.push(new THREE.Vector2(0.26, 0.29))
  points.push(new THREE.Vector2(0.32, 0.28))
  points.push(new THREE.Vector2(0.38, 0.25))
  points.push(new THREE.Vector2(0.44, 0.21))
  points.push(new THREE.Vector2(0.48, 0.16))
  points.push(new THREE.Vector2(0.5, 0.1))
  points.push(new THREE.Vector2(0.5, 0.04))
  points.push(new THREE.Vector2(0.48, -0.06))
  points.push(new THREE.Vector2(0.42, -0.14))
  points.push(new THREE.Vector2(0.34, -0.19))
  points.push(new THREE.Vector2(0.24, -0.22))
  points.push(new THREE.Vector2(0.14, -0.23))
  points.push(new THREE.Vector2(0.06, -0.22))
  points.push(new THREE.Vector2(0.02, -0.18))
  points.push(new THREE.Vector2(0, -0.12))
  points.push(new THREE.Vector2(0, 0))

  const lathe = new THREE.LatheGeometry(points, 24)
  lathe.computeVertexNormals()
  const mesh = new THREE.Mesh(lathe, bodyMat)
  mesh.scale.set(0.9 + (variant === 'B' ? 0.15 : 0) + (variant === 'C' ? 0.05 : 0), 0.7, 1.0)
  mesh.rotation.y = Math.PI / 2
  mesh.position.x = 0.1
  return mesh
}

function createCaudalFin(): THREE.Group {
  const group = new THREE.Group()
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffd54f,
    side: THREE.DoubleSide,
    roughness: 0.6,
    flatShading: true,
  })
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.quadraticCurveTo(0.6, 0.25, 0.9, 0)
  shape.quadraticCurveTo(0.6, -0.25, 0, 0)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2,
  })
  geo.rotateY(Math.PI / 2)
  geo.scale(0.8, 0.9, 1)
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set(0, 0, 0)
  group.add(mesh)
  return group
}

function createDorsalFin(): THREE.Mesh {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.quadraticCurveTo(0.4, 0.35, 0.8, 0)
  shape.quadraticCurveTo(0.4, 0.08, 0, 0)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.015,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  })
  geo.rotateY(Math.PI / 2)
  const mat = new THREE.MeshStandardMaterial({
    color: 0xef9a9a,
    side: THREE.DoubleSide,
    roughness: 0.6,
    flatShading: true,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.rotation.z = -0.15
  return mesh
}

function createAnalFin(): THREE.Mesh {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.quadraticCurveTo(0.35, -0.25, 0.7, 0)
  shape.quadraticCurveTo(0.35, -0.06, 0, 0)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.015,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  })
  geo.rotateY(Math.PI / 2)
  const mat = new THREE.MeshStandardMaterial({
    color: 0xce93d8,
    side: THREE.DoubleSide,
    roughness: 0.6,
    flatShading: true,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.rotation.z = 0.25
  return mesh
}

function createPectoralFin(): THREE.Mesh {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.quadraticCurveTo(0.25, 0.18, 0.5, 0)
  shape.quadraticCurveTo(0.25, 0.05, 0, 0)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.012,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
  })
  geo.rotateY(Math.PI / 2)
  const mat = new THREE.MeshStandardMaterial({
    color: 0x81d4fa,
    side: THREE.DoubleSide,
    roughness: 0.6,
    flatShading: true,
  })
  return new THREE.Mesh(geo, mat)
}

function createEyeGroup(): THREE.Group {
  const group = new THREE.Group()
  const scleraGeo = new THREE.SphereGeometry(0.08, 10, 8)
  scleraGeo.scale(1, 0.6, 0.4)
  const scleraMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const sclera = new THREE.Mesh(scleraGeo, scleraMat)
  group.add(sclera)

  const irisGeo = new THREE.SphereGeometry(0.045, 8, 6)
  irisGeo.scale(1, 0.6, 0.4)
  const irisMat = new THREE.MeshBasicMaterial({ color: 0x000000 })
  const iris = new THREE.Mesh(irisGeo, irisMat)
  iris.position.z = 0.03
  group.add(iris)
  return group
}

function createFish(variant: 'A' | 'B' | 'C'): THREE.Group {
  const fish = new THREE.Group()

  const bodyMat = new THREE.MeshStandardMaterial({
    color: variant === 'A' ? 0xff7043 : variant === 'B' ? 0x29b6f6 : 0x66bb6a,
    roughness: 0.5,
    flatShading: true,
  })

  const body = createOrganicBody(variant, bodyMat)
  fish.add(body)

  const caudal = createCaudalFin()
  caudal.position.set(-0.48, 0, 0)
  fish.add(caudal)

  const dorsal = createDorsalFin()
  dorsal.position.set(-0.05, 0.22, 0)
  fish.add(dorsal)

  const anal = createAnalFin()
  anal.position.set(-0.05, -0.22, 0)
  fish.add(anal)

  const leftPec = createPectoralFin()
  leftPec.position.set(0.25, -0.08, 0.18)
  leftPec.rotation.y = Math.PI / 2
  leftPec.rotation.z = 0.3
  fish.add(leftPec)

  const rightPec = createPectoralFin()
  rightPec.position.set(0.25, -0.08, -0.18)
  rightPec.rotation.y = -Math.PI / 2
  rightPec.rotation.z = 0.3
  fish.add(rightPec)

  const eyeL = createEyeGroup()
  eyeL.position.set(0.45, 0.08, 0.24)
  fish.add(eyeL)

  const eyeR = createEyeGroup()
  eyeR.position.set(0.45, 0.08, -0.24)
  fish.add(eyeR)

  fish.scale.set(0.8, 0.8, 0.8)
  return fish
}

export function createFishSchool(count = 12): Fish[] {
  const bounds = { minX: -9, maxX: 9, minZ: -6, maxZ: 6, minY: 1, maxY: 4 }
  const variants: Array<'A' | 'B' | 'C'> = ['A', 'B', 'C']
  const school: Fish[] = []
  for (let i = 0; i < count; i++) {
    const v = variants[i % 3]
    const mesh = createFish(v)
    const pos = new THREE.Vector3(
      (Math.random() - 0.5) * 16,
      bounds.minY + Math.random() * (bounds.maxY - bounds.minY),
      (Math.random() - 0.5) * 10,
    )
    mesh.position.copy(pos)
    mesh.lookAt(pos.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2)))

    const f = mesh as unknown as Fish
    f.mesh = mesh
    f.speed = 0.3 + Math.random() * 0.8
    f.turnSpeed = 0.8 + Math.random() * 0.8
    f.phase = Math.random() * Math.PI * 2
    f.bounds = bounds
    f.target = new THREE.Vector3().copy(pos).add(
      new THREE.Vector3((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 4),
    )
    f.body = mesh.children[0] as THREE.Mesh
    f.tail = mesh.children[1] as THREE.Group
    f.dorsal = mesh.children[2] as THREE.Mesh
    f.anal = mesh.children[3] as THREE.Mesh
    f.leftPec = mesh.children[4] as THREE.Mesh
    f.rightPec = mesh.children[5] as THREE.Mesh

    school.push(f)
  }
  return school
}
