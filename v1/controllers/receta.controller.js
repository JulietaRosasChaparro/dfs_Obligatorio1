import {
  crearRecetaService,
  eliminarRecetaService,
  actualizarRecetaService,
  obtenerRecetasService,
  buscarRecetasPorTodosIngredientes,
  buscarRecetasPorAlgunoIngrediente
} from "../services/receta.services.js";

// Crear nueva receta
export const crearRecetaController = async (req, res) => {
  try {
    const nuevaReceta = await crearRecetaService(req.user.id, req.body);
    res.status(201).json(nuevaReceta);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Eliminar receta existente
export const eliminarRecetaController = async (req, res) => {
  try {
    const recetaEliminada = await eliminarRecetaService(req.user.id, req.params.id);
    res.status(200).json({ mensaje: "Receta eliminada", receta: recetaEliminada });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Actualizar receta existente
export const actualizarRecetaController = async (req, res) => {
  try {
    const recetaActualizada = await actualizarRecetaService(req.user.id, req.params.id, req.body);
    res.status(200).json(recetaActualizada);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Obtener todas las recetas del usuario
export const obtenerRecetasController = async (req, res) => {
  try {
    const recetas = await obtenerRecetasService(req.user.id);
    res.status(200).json(recetas);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Buscar recetas que contengan los ingredientes especificados
export const getRecetasPorIngredientes = async (req, res) => {
  try {
    const { ingredientes, tipo } = req.query;

    if (!ingredientes) {
      return res.status(400).json({ error: "Debes proporcionar al menos un ingrediente" });
    }

    const ingredientesArray = [];
    const partes = ingredientes.split(",");
    for (let i = 0; i < partes.length; i++) {
      ingredientesArray.push(partes[i].trim());
    }

    let recetas = [];
    if (tipo === "todos") {
      recetas = await buscarRecetasPorTodosIngredientes(ingredientesArray);
    } else {
      recetas = await buscarRecetasPorAlgunoIngrediente(ingredientesArray);
    }

    if (recetas.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron recetas con esos ingredientes" });
    }

    res.json(recetas);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor", detalle: error.message });
  }
};
