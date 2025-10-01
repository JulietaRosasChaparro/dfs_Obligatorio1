import Receta from "../models/receta.model.js";
import Usuario from "../models/usuario.model.js";
import { MAX_DOCS_PLUS } from "../data/planes.js";

// Alta (crear receta)
export const crearRecetaService = async (userId, data) => {
  const usuario = await Usuario.findById(userId);
  if (!usuario) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }

  // Validar límite para plan plus
  if (usuario.plan === "plus") {
    const count = await Receta.countDocuments({ autor: userId });
    if (count >= MAX_DOCS_PLUS) {
      const err = new Error(`Límite de ${MAX_DOCS_PLUS} recetas alcanzado para usuarios Plus`);
      err.status = 403;
      throw err;
    }
  }

  const nuevaReceta = new Receta({ ...data, autor: userId });
  await nuevaReceta.save();
  return nuevaReceta;
};

// Baja (eliminar receta)
export const eliminarRecetaService = async (userId, recetaId) => {
  const receta = await Receta.findOneAndDelete({ _id: recetaId, autor: userId });
  if (!receta) {
    const err = new Error("Receta no encontrada o no autorizado");
    err.status = 404;
    throw err;
  }
  return receta;
};

// Modificación (actualizar receta)
export const actualizarRecetaService = async (userId, recetaId, data) => {
  const receta = await Receta.findOneAndUpdate(
    { _id: recetaId, autor: userId },
    data,
    { new: true }
  );
  if (!receta) {
    const err = new Error("Receta no encontrada o no autorizado");
    err.status = 404;
    throw err;
  }
  return receta;
};

// Consulta (obtener recetas del usuario)
export const obtenerRecetasService = async (userId) => {
  return await Receta.find({ autor: userId });
};

// Búsqueda por ingredientes
export const buscarRecetasPorTodosIngredientes = async (ingredientes) => {
  return await Receta.find({
    "ingredientes.nombre": { $all: ingredientes }
  });
};

// Búsqueda por alguno de los ingredientes
export const buscarRecetasPorAlgunoIngrediente = async (ingredientes) => {
  return await Receta.find({
    "ingredientes.nombre": { $in: ingredientes }
  });
};