import { obtenerCategoriasService, crearCategoriaService } from "../services/categoria.services.js";

export const obtenerCategoriasController = async (req, res) => {
  try {
    const cats = await obtenerCategoriasService();
    res.status(200).json(cats);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

export const crearCategoriaController = async (req, res) => {
  try {
    const cat = await crearCategoriaService(req.body);
    res.status(201).json(cat);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}