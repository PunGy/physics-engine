import { HEIGHT, WIDTH } from "./constants";

declare global {
    interface CanvasRenderingContext2D {
        webkitBackingStorePixelRatio: number;
        mozBackingStorePixelRatio: number;
        msBackingStorePixelRatio: number;
        oBackingStorePixelRatio: number;
        backingStorePixelRatio: number;
    }
}

export class Viewport {
  static width = WIDTH
  static height = HEIGHT

  static pixelRatio = 1

  static canvas: HTMLCanvasElement
  static ctx: CanvasRenderingContext2D

  static init() {
    const canvas = document.getElementById('world') as HTMLCanvasElement
    if (!canvas) {
      throw new Error('No canvas element')
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Cannot create context')
    }
    const { width, height } = Viewport

    const dpr = window.devicePixelRatio || 1
    const bsr = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1
    const pixelRatio = dpr / bsr

    canvas.width = width * pixelRatio
    canvas.height = height * pixelRatio

    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    Viewport.canvas = canvas
    Viewport.ctx = ctx
    Viewport.pixelRatio = pixelRatio
  }

  static scaled(x: number) {
    return x * this.pixelRatio
  }

  static rect(x: number, y: number, width: number, height: number) {
    this.ctx.fillRect(
      this.scaled(x),
      this.scaled(y),
      this.scaled(width),
      this.scaled(height),
    )
  }
}

