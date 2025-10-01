import mongoose from "mongoose";
import ingredienteSchema from "./ingrediente.model.js"; // ajusta la ruta si es distinta

const recetaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    ingredientes: [ingredienteSchema], // aquí usamos el schema ya creado
    pasos: [{ type: String, required: true }],
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    tiempoPreparacion: { type: Number }, // en minutos
    dificultad: { type: String, enum: ["Fácil", "Intermedio", "Difícil"] },
    fechaCreacion: { type: Date, default: Date.now },
  }
);

export default mongoose.model("Receta", recetaSchema);
