import './style.css'
import { createWorld, handleResize, type World } from './core/scene'
import { createControls } from './core/controls'
import { createAquariumEnvironment } from './environment/aquarium'

const app = document.querySelector<HTMLElement>('#app')
if (!app) {
  throw new Error('No se encontró el elemento #app')
}

const world: World = createWorld(app)
const controls = createControls(world)

world.scene.add(createAquariumEnvironment())

function animate(): void {
  controls.update()
  world.renderer.render(world.scene, world.camera)
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)

const resize = () => handleResize(world, app)
window.addEventListener('resize', resize)
resize()
