import { Viewport } from "../ViewportService";
import { BaseNode } from "./BaseNode";

export class BaseRectangle extends BaseNode {
  readonly type = 'rectangle'
  collidable = true;

  width: number
  height: number
  vx: number = 0
  vy: number = 0
  mass: number = 5

  holding = false

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y)
    this.width = width
    this.height = height
  }
}

export class CanvasRectangle extends BaseRectangle {
  draw() {
    Viewport.ctx.fillStyle = '#ffffff'
    Viewport.rect(this.x, this.y, this.width, this.height)
  }
}


