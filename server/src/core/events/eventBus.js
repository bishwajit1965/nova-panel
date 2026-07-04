import { validateEvent } from "./validateEvent.js";

class EventBus {
  constructor() {
    this.events = new Map();
    this.wildcards = [];
  }

  on(event, handler) {
    if (event === "*") {
      this.wildcards.push(handler);
      return;
    }

    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    this.events.get(event).push(handler);
  }

  emit(event, payload) {
    validateEvent(event); // 🔒 ENFORCEMENT LAYER

    const handlers = this.events.get(event) || [];

    handlers.forEach((handler) => handler(payload, event));

    this.wildcards.forEach((handler) => handler(payload, event));
  }
}

export const eventBus = new EventBus();
