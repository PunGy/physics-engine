import { WIDTH, HEIGHT } from '../constants'
import { SceneService } from '../SceneService'
import { circle, g } from '../utils'
import { BaseNode } from './BaseNode'

export class Circle extends BaseNode {
  readonly type = 'circle'

  x = WIDTH / 2
  y = HEIGHT / 2
  mass = 3
  vy = 0
  vx = 0
  radius = 10

  bounciness = 0.6

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

    const { delta } = SceneService;

    const RESTING_THRESHOLD = 2

    if (this.y < HEIGHT - this.radius) {
      this.vy += g * delta;
    }

    this.x += this.vx * delta;
    this.y += this.vy * delta;

    if (this.y + this.radius > HEIGHT) {
      this.y = HEIGHT - this.radius;
      this.vy *= -this.bounciness;
      if (Math.abs(this.vy) < RESTING_THRESHOLD) {
        this.vy = 0;
      }
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.vy *= -this.bounciness;
    }

    if (this.x + this.radius > WIDTH) {
      this.x = WIDTH - this.radius;
      this.vx *= -this.bounciness;
    } else if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.vx *= -this.bounciness;
    }
  }
}
