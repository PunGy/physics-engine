import { CircleShape, isCircle, Movable, WithMass } from "./objects"
import { SceneService } from "./SceneService"
import { circleIntersection } from "./utils"

type MovableCircle = Movable & CircleShape & WithMass

export class PhysicsEngine {

  act() {
    this.checkCollisions()
  }

  checkCollisions() {
    const nodesToCheck = SceneService.nodes.filter(node => node.collidable).reverse()
    let node = nodesToCheck.pop()!
    while (nodesToCheck.length > 0) {
      const node2 = nodesToCheck.find(node2 => {
        if (isCircle(node) && isCircle(node2)) {
          return circleIntersection(node, node2)
        }
        return false
      })

      if (node2) {
        if (node.type !== 'circle' || node2.type !== 'circle') {
          continue;
        }
        const [ball, ball2] = [node, node2] as unknown as [MovableCircle, MovableCircle];
        const { x: x1, y: y1, radius: r1 } = ball
        const { x: x2, y: y2, radius: r2 } = ball2
        const intersectionLength = (r1 + r2) - Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
        const contactAngle = Math.atan2(ball.y - ball2.y, ball.x - ball2.x)
        const mx = intersectionLength * Math.cos(contactAngle)
        const my = intersectionLength * Math.sin(contactAngle)

        ball.x += mx
        ball.y += my

        const { x: vx1, y: vy1 } = PhysicsEngine.fullCircleCinnematic(ball, ball2)
        const { x: vx2, y: vy2 } = PhysicsEngine.fullCircleCinnematic(ball2, ball)

        const p1 = Math.abs(ball.vx * ball.mass)
        const p2 = Math.abs(ball2.vx * ball2.mass)

        ball.vx = vx1
        ball.vy = vy1
        ball2.vx = vx2
        ball2.vy = vy2

        const _p1 = Math.abs(ball.vx * ball.mass)
        const _p2 = Math.abs(ball2.vx * ball2.mass)

        const sumV = p1 + p2 === _p1 + _p2
        console.log(sumV)
        console.log(Math.abs(_p2) + Math.abs(_p1))

        // intersected.onCollided(ball)
        // ball.onCollided(intersected)
      }
      node = nodesToCheck.pop()!
    }
  }

  static simpleCircleCinnematic(ball: MovableCircle, ball2: MovableCircle) {
    // (100 * 10) / 10
    return (2 * ball2.mass * ball2.vx + ball.vx * (ball.mass - ball2.mass)) / (ball.mass + ball2.mass)
  }

  static fullCircleCinnematic(ball: MovableCircle, ball2: MovableCircle) {
    const { mass: m1, vx: vx1, vy: vy1 } = ball
    const { mass: m2, vx: vx2, vy: vy2 } = ball2
    const { cos, sin, atan2, sqrt } = Math

    const contactAngle = atan2(ball.y - ball2.y, ball.x - ball2.x)
    const velocityAngle1 = atan2(vy1, vx1)
    const velocityAngle2 = atan2(vy2, vx2)
    const deltaA1 = velocityAngle1 - contactAngle
    const deltaA2 = velocityAngle2 - contactAngle
    const deltaM = m1 - m2
    const v1 = sqrt(vx1 ** 2 + vy1 ** 2)
    const v2 = sqrt(vx2 ** 2 + vy2 ** 2)

    return {
      x: ((v1 * cos(deltaA1) * deltaM + 2 * m2 * v2 * cos(deltaA2)) / (m1 + m2)) * cos(contactAngle)
        + v1 * sin(deltaA1) * cos(contactAngle + Math.PI / 2),
      y: ((v1 * cos(deltaA1) * deltaM + 2 * m2 * v2 * cos(deltaA2)) / (m1 + m2)) * sin(contactAngle)
        + v1 * sin(deltaA1) * sin(contactAngle + Math.PI / 2),
    };
  }
}
