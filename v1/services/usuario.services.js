import Usuario from "../models/usuario.model.js";

// Servicio para cambiar plan de plus a premium
export const cambiarPlanService = async (userId) => {
    const usuario = await Usuario.findById(userId);

    if (!usuario) {
        const err = new Error("Usuario no encontrado");
        err.status = 404;
        throw err;
    }

    if (usuario.plan !== "plus") {
        const err = new Error("Solo se puede cambiar de plan plus a premium");
        err.status = 400;
        throw err;
    }

    usuario.plan = "premium";
    await usuario.save();

    return usuario;
};
