import { CircleShape } from "./objects";
import { SceneNode } from "./SceneService";
import { Viewport } from "./ViewportService";

export const g = 9.8

export const isDrawable = <T extends SceneNode>(node: T): node is T & { draw: () => void } => {
  return 'draw' in node
}
export const isActable = <T extends SceneNode>(node: T): node is T & { act: () => void } => {
  return 'act' in node
}

export const circle = (x: number, y: number, radius: number) => {
  const { ctx } = Viewport

  ctx.beginPath()
  ctx.fillStyle = '#ffffff'
  ctx.arc(Viewport.scaled(x), Viewport.scaled(y), Viewport.scaled(radius), 0, Math.PI * 2);
  ctx.fill()
}

export const circleIntersection = (ball1: CircleShape, ball2: CircleShape) => {
  const { x: x1, y: y1, radius: r1 } = ball1
  const { x: x2, y: y2, radius: r2 } = ball2

  return (x2 - x1) ** 2 + (y2 - y1) ** 2 < (r1 + r2) ** 2
}
