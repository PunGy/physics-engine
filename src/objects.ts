export type Movable = {
  vx: number;
  vy: number;
}

export type WithMass = {
  mass: number;
}

export type CircleShape = {
  x: number;
  y: number;
  radius: number;
}

export type RectangleShape = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number; // 0 -> 360
}

export const isCircle = <T extends object>(node: T): node is T & CircleShape => {
  return (node as any)?.type === 'circle'
}
