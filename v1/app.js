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

// 🔥 CONFIGURACIÓN CORS CORREGIDA Y SIMPLIFICADA
const corsOptions = {
  origin: [
    "https://dfs-obligatorio.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Manejar preflight requests explícitamente
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging para debugging
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

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

// Manejo de errores de CORS
app.use((error, req, res, next) => {
  if (error.message.includes('CORS')) {
    return res.status(403).json({
      error: 'Acceso CORS denegado',
      details: error.message
    });
  }
  next(error);
});

export default app;