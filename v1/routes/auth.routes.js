import express from 'express';
import { loginController, registerController } from '../controllers/auth.controller.js';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware.js';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';

const router = express.Router();

// Ruta de login
router.post('/login', validateBodyMiddleware(loginSchema), loginController);

// Ruta de registro
router.post('/register', validateBodyMiddleware(registerSchema), registerController);

export default router;