import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  crearRecetaController,
  eliminarRecetaController,
  actualizarRecetaController,
  obtenerRecetasController
} from "../controllers/receta.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", crearRecetaController)      // Alta
router.get("/", obtenerRecetasController)         // Consulta
router.patch("/:id", actualizarRecetaController)  // Modificación
router.delete("/:id", eliminarRecetaController) // Baja

export default router