import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./v1/app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Conexión a Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(PORT, () => {
      console.log(`Servidor local corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("Error al conectar con MongoDB", err));
