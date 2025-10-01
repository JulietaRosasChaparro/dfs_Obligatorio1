import { cambiarPlanService } from "../services/usuario.services.js";

export const cambiarPlanController = async (req, res) => {
    try {
        const usuarioActualizado = await cambiarPlanService(req.user.id);

        res.status(200).json({
            message: "Plan actualizado a premium",
            plan: usuarioActualizado.plan
        });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};
