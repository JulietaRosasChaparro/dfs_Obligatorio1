import express from "express";
import { cambiarPlanController } from "../controllers/usuario.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/plan", authMiddleware, cambiarPlanController);

export default router;
