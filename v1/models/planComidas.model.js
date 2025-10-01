import mongoose from "mongoose";

const planComidasSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  recetas: [
    {
      receta: { type: mongoose.Schema.Types.ObjectId, ref: "Receta", required: true },
      dia: { type: String, enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"], required: true },
      comida: { type: String, enum: ["Desayuno", "Almuerzo", "Cena", "Snack"], required: true }
    }
  ],
  fechaCreacion: { type: Date, default: Date.now }
});

export default mongoose.model("PlanComidas", planComidasSchema)
