import Usuario from "../models/usuario.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Login
export const loginService = async ({ username, password }) => {
    const usuario = await Usuario.findOne({ username });
    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
        const err = new Error("Credenciales inválidas");
        err.status = 401;
        throw err;
    }

    const token = jwt.sign(
        { id: usuario._id, username: usuario.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    return {
        token,
        user: {
            id: usuario._id,
            username: usuario.username,
            email: usuario.email,
            plan: usuario.plan
        }
    };
};

// Registro
export const registerService = async ({ username, email, password }) => {
    // 1️⃣ Validaciones básicas
    if (!username || !email || !password) {
        const err = new Error("Todos los campos son obligatorios");
        err.status = 400;
        throw err;
    }

    if (!email.includes("@")) {
        const err = new Error("Email inválido");
        err.status = 400;
        throw err;
    }

    // 2️⃣ Verificar si ya existe el usuario
    const existingUser = await Usuario.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        const err = new Error("Usuario o email ya existe");
        err.status = 409; // conflicto
        throw err;
    }

    // 3️⃣ Crear usuario
    const hashPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ username, email, password: hashPassword });
    await nuevoUsuario.save();

    // 4️⃣ Generar token
    const token = jwt.sign(
        { id: nuevoUsuario._id, username: nuevoUsuario.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    return {
        token,
        user: {
            id: nuevoUsuario._id,
            username: nuevoUsuario.username,
            email: nuevoUsuario.email,
            plan: nuevoUsuario.plan
        }
    };
};

