import { HEIGHT, WIDTH } from "./constants";

export class Viewport {
  static width = WIDTH
  static height = HEIGHT

  static canvas: HTMLCanvasElement
  static ctx: CanvasRenderingContext2D

  static init() {
    const canvasEl = document.getElementById('world') as HTMLCanvasElement
    if (!canvasEl) {
      throw new Error('No canvas element')
    }
    const ctx = canvasEl.getContext('2d')
    if (!ctx) {
      throw new Error('Cannot create context')
    }


    canvasEl.width = WIDTH
    canvasEl.height = HEIGHT

    Viewport.canvas = canvasEl
    Viewport.ctx = ctx
  }
}

