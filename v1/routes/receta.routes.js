import express from "express";
import { authenticateMiddleware } from "../middlewares/auth.middleware.js";
import {
  crearRecetaController,
  eliminarRecetaController,
  actualizarRecetaController,
  obtenerRecetasController
} from "../controllers/receta.controller.js";

const router = express.Router();

router.use(authenticateMiddleware);

router.post("/", crearRecetaController)      // Alta
router.get("/", obtenerRecetasController)         // Consulta
router.patch("/:id", actualizarRecetaController)  // Modificación
router.delete("/:id", eliminarRecetaController) // Baja

export default router