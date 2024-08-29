import { Viewport } from "./ViewportService";

export const MOUSE_EVENTS = [
  'mousedown',
  'mouseup',
  'mousemove',
] as const

export type EventType = (typeof MOUSE_EVENTS)[number]
export type MouseEvents = HTMLElementEventMap[EventType]

export class MouseService {
  static hitbox: HTMLElement

  static init() {
    const hitbox = Viewport.canvas
    MouseService.hitbox = hitbox
  }

  static on(eventType: EventType, listener: (event: HTMLElementEventMap[EventType]
  ) => void) {
    MouseService.hitbox.addEventListener(eventType, listener)
  }
}

