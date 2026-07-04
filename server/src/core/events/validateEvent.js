import { EVENT_REGISTRY } from "./eventRegistry.js";
import AppError from "../errors/AppError.js";

export const validateEvent = (eventName) => {
  if (!EVENT_REGISTRY[eventName]) {
    throw new AppError(`Invalid event: ${eventName}`, 400);
  }

  return true;
};
