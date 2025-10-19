import { HEIGHT, WIDTH } from "./constants";
import { Viewport } from "./ViewportService";

export class Background {
  x = 0;
  y = 0;

  width = WIDTH
  height = HEIGHT

  draw() {
    const { ctx } = Viewport
    ctx.fillStyle = '#191a23'
    Viewport.rect(this.x, this.y, this.width, this.height);
  }
}
