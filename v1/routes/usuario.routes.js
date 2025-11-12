
import express from "express";
import { 
  cambiarPlanController, 
  actualizarImagenPerfilUrl
} from "../controllers/usuario.controller.js";
import { authenticateMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/plan", authenticateMiddleware, cambiarPlanController);

router.patch(
  "/imagen-perfil-url",
  authenticateMiddleware,
  actualizarImagenPerfilUrl
);


export default router;