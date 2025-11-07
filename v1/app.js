import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Rutas
import authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import recetaRoutes from './routes/receta.routes.js';
import categoriaRoutes from './routes/categoria.routes.js';

// Middlewares
import { authenticateMiddleware } from './middlewares/auth.middleware.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://dfs-obligatorio.vercel.app",
      ];
      if (
        allowedOrigins.includes(origin) ||
        (origin && origin.endsWith(".julietarosas-projects.vercel.app"))
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS bloqueado para este origen: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2️⃣ Rutas públicas
app.use('/v1/auth', authRoutes);

// 3️⃣ Middleware de autenticación (solo rutas protegidas)
app.use(authenticateMiddleware);

// 4️⃣ Rutas protegidas
app.use('/v1/usuarios', usuarioRoutes);
app.use('/v1/recetas', recetaRoutes);
app.use('/v1/categorias', categoriaRoutes);

// 5️⃣ Error 404 y error global
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
