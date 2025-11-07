import express from "express";
import { authenticateMiddleware } from "../middlewares/auth.middleware.js";
import {
  obtenerCategoriasController,
  crearCategoriaController
} from "../controllers/categoria.controller.js";

const router = express.Router();

router.use(authenticateMiddleware);

router.get("/", obtenerCategoriasController);   // Listar categorías
router.post("/", crearCategoriaController); // Crear categoría

export default router
