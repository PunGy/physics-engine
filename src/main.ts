import { Background } from './Background';
import { Scene } from './Components/Scene';
import { HEIGHT, WIDTH } from './constants';
import { MouseService } from './MouseService';
import { BaseRectangle } from './Objects/Rectangle';
import { PhysicsEngine } from './PhysicsEngine';
import { SceneService } from './SceneService';
import { isActable, isDrawable } from './utils';
import { Viewport } from './ViewportService'

function startGame() {
  Viewport.init()
  MouseService.init()
  SceneService.init()

  SceneService.addNode(new Background())
  SceneService.addNode(new Scene())
  SceneService.addNode(new PhysicsEngine())

  const walls = [
    new BaseRectangle(0, 0, 1, HEIGHT),
    new BaseRectangle(0, 0, WIDTH, 1),
    new BaseRectangle(WIDTH, 0, 1, HEIGHT),
    new BaseRectangle(0, HEIGHT, WIDTH, 1),
  ]
  walls.forEach(wall => SceneService.addNode(wall))

  let prev: number, delta = 0
  const lock = 0
  function f(timestamp: number) {
    if (!prev) {
      prev = timestamp
      gameLoop(delta)
    } else {
      delta = timestamp - prev
      if (delta >= lock) {
        prev = timestamp
        gameLoop(delta)
      }
    }

    window.requestAnimationFrame(f)
  }

  window.requestAnimationFrame(f)
}

function gameLoop(delta: number) {
  delta /= 100

  SceneService.delta = delta
  SceneService.nodes.forEach(node => {
    if (isDrawable(node)) {
      node.draw()
    }
    if (isActable(node)) {
      node.act()
    }
  })
}

startGame()

