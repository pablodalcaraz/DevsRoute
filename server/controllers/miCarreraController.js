import { obtenerMateriaPorPlan } from "../models/materiaModel.js";

export const mostrarMateriasPorPlan = async (req,res) => {
    try {
        const id_plan = req.session.usuario ? req.session.usuario.id_plan_de_estudio : null;
        if (!id_plan) {
            return res.status(400).json({ error: "No se pudo obtener el plan de estudio del usuario" });
        }
        const results = await obtenerMateriaPorPlan(id_plan)
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "No se encontraron materias para este plan de estudio" });
        }
        return res.json(results)
    } catch (error) {
        console.error("Error al mostrarMateriasPorPlan:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}
