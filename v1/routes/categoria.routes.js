import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  obtenerCategoriasController,
  crearCategoriaController
} from "../controllers/categoria.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", obtenerCategoriasController);   // Listar categorías
router.post("/", crearCategoriaController); // Crear categoría

export default router
