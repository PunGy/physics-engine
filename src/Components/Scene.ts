import { MouseService } from "../MouseService";
import { SceneNode, SceneService } from "../SceneService";
import { isCircle, Movable, WithMass } from "../objects";
import { BaseRectangle } from "../Objects/Rectangle";
import { HEIGHT, WIDTH } from "../constants";
import { Circle } from "../Objects/Circle";

type Node = SceneNode & {
  x: number;
  y: number;
  holding: boolean;
} & Movable & WithMass

export class Scene implements SceneNode {
  nodes: Array<Node> = []

  addNode(ball: Node) {
    this.nodes.push(ball)
    SceneService.addNode(ball)
  }

  constructor() {
    // DEMO objects
    //
    // const ballA = new Circle(0,0,10)
    // const ballB = new Circle(0,0,10)
    //
    // ballA.y = ballB.y = HEIGHT - ballA.radius
    // ballA.x = WIDTH / 2 - 50
    // ballA.vx = 10
    // ballA.mass *= 2
    //
    // ballB.x = WIDTH / 2 + 50
    // ballB.vx = 0
    //
    // this.addNode(ballA)
    // this.addNode(ballB)

    const walls = [
      new BaseRectangle(0, 0, 1, HEIGHT),
      new BaseRectangle(0, 0, WIDTH, 1),
      new BaseRectangle(WIDTH, 0, 1, HEIGHT),
      new BaseRectangle(0, HEIGHT, WIDTH, 1),
    ]
    walls.forEach(wall => this.addNode(wall))

    let prevY = 0
    let prevX = 0
    MouseService.on('mousedown', (event) => {
      const [a, b] = [event.offsetX, event.offsetY]

      let catchOne = false
      this.nodes.forEach(node => {
        if (isCircle(node)) {
          const { x, y, radius: r } = node

          if ((x - a) ** 2 + (y - b) ** 2 <= r ** 2) {
            node.holding = true
            node.vy = 0
            node.vx = 0
            prevY = event.offsetY
            prevX = event.offsetX
            catchOne = true
          }
        }
      })

      if (!catchOne) {
        const obj = new Circle(a, b, 10)
        obj.x = a
        obj.y = b
        this.addNode(obj)
      }
    })

    MouseService.on('mouseup', () => {
      this.nodes.forEach(node => {
        if (node.holding) {
          node.holding = false
        }
      })
    })

    MouseService.on('mousemove', (event) => {
      this.nodes.forEach(node => {
        if (node.holding) {
          const { offsetX: x, offsetY: y } = event
          const dy = y - prevY
          const dx = x - prevX
          prevY = y
          prevX = x

          node.vy = dy / SceneService.delta
          node.vx = dx / SceneService.delta

          node.y = y
          node.x = x
        }
      })
    })
  }

  act() { }
}
