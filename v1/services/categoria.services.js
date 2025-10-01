import Categoria from "../models/categoria.model.js";

// Listar categorías
export const obtenerCategoriasService = async () => {
  return await Categoria.find();
};

// Crear categoría
export const crearCategoriaService = async (data) => {
  const nueva = new Categoria(data);
  await nueva.save();
  return nueva;
};