export const logger = (msg, ...args) => {
  console.log(`[LOGGED] → Data found on → ${msg} →`, ...args);
};
