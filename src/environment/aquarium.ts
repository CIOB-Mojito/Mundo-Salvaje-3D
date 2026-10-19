import * as THREE from 'three'
import { createFloor } from './floor'
import { createRocks } from './rocks'
import { createCorals } from './corals'
import { createPlants } from './plants'
import { createParticles } from './particles'

export function createAquariumEnvironment(): THREE.Group {
  const env = new THREE.Group()
  env.add(createFloor())
  env.add(createRocks())
  env.add(createCorals())
  env.add(createPlants())
  env.add(createParticles())
  return env
}
