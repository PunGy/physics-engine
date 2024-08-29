export interface SceneNode {
  draw?: () => void;
  act?: () => void;
  collidable?: boolean;
  type?: 'circle' | 'rectangle'
}


export class SceneService {
  static delta: number = 0
  static nodes: Array<SceneNode> = []


  static addNode<T extends SceneNode>(node: T) {
    this.nodes.push(node);
  }

  static init() {

  }
}
