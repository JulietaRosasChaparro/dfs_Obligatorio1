import { cambiarPlanService } from "../services/usuario.services.js";
import Usuario from "../models/usuario.model.js";

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

export const actualizarImagenPerfilUrl = async (req, res) => {
  try {
    const userId = req.user.id;
    const { imagenUrl } = req.body;

    if (!imagenUrl) {
      return res.status(400).json({ error: "Falta la URL de la imagen" });
    }

    // Actualiza solo el campo imagenPerfil
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      userId,
      { imagenPerfil: imagenUrl },
      { new: true }
    ).select("-password");

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: "Imagen de perfil actualizada con éxito",
      user: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar la imagen de perfil:", error);
    res.status(500).json({
      error: "Error interno al actualizar la imagen de perfil",
    });
  }
};