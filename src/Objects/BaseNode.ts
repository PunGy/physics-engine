import type { SceneNode } from "../SceneService";

export abstract class BaseNode implements SceneNode {
  abstract readonly type: 'circle' | 'rectangle'

  collidable = false;
  static = false

  x: number = 0
  y: number = 0

  vx = 0
  vy = 0
  mass = 0


  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
