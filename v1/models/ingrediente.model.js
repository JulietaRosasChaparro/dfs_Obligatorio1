import mongoose from "mongoose";

const ingredienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  unidad: { type: String, required: true } // g, ml, cucharadas, etc.
});

export default ingredienteSchema