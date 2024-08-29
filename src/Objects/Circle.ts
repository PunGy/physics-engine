import { WIDTH, HEIGHT } from '../constants'
import { SceneService, SceneNode } from '../SceneService'
import { circle, g } from '../utils'
import { BaseNode } from './BaseNode'

export class Circle extends BaseNode {
  readonly type = 'circle'

  x = WIDTH / 2
  y = HEIGHT / 2
  mass = 5
  vy = 0
  vx = 50
  radius = 10

  collidable = true

  holding = false

  constructor(x: number, y: number, radius: number) {
    super(x, y)
    this.radius = radius
  }

  draw() {
    circle(this.x, this.y, this.radius)
  }

  act() {
    if (this.holding) {
      return;
    }
    const { delta } = SceneService

    // console.log(`X: ${this.x}; VX: ${this.vx} VY: ${this.vy}`)
    // console.log(delta)

    if (this.y < HEIGHT - this.radius && this.y > this.radius) {
      this.vy += this.mass * g * delta
      this.y += Math.min(
        HEIGHT - this.y - this.radius,
        this.vy * delta + (g * delta ** 2) / 2,
      )
    } else {
      this.vy /= 1.2
      this.vy = -this.vy
      this.y += this.vy * delta
    }

    if ((this.x < WIDTH - this.radius) && (this.x > this.radius)) {
      this.x += this.vx * delta
    } else {
      // collision with borders
      const prevVX = this.vx
      this.vx = -(this.vx)
      const shift = this.vx * delta

      if (prevVX > 0) {
        this.x += Math.min(WIDTH - this.x - this.radius, shift)
      } else {
        this.x += Math.max(0, shift)
      }
      this.x += this.vx * delta
    }
  }

  onCollided(body: Circle) {
    // this.vx = (2 * body.mass * body.vx + this.vx * (this.mass - body.mass)) / (this.mass + body.mass)
    // this.vy /= 2
    // this.vy = -this.vy
  }
}
