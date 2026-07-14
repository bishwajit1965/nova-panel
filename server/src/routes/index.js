import express from "express";
import modules from "../modules/loadModules.js";

const router = express.Router();

modules.forEach((mod) => {
  if (!mod.name || !mod.routes) {
    throw new Error("invalid module structure.");
  }
  router.use(`/${mod.name}`, mod.routes);
});

export default router;
