import express from "express";
import { cambiarPlanController } from "../controllers/usuario.controller.js";
import { authenticateMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/plan", authenticateMiddleware, cambiarPlanController);

export default router;
