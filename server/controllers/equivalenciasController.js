import { obtenerEquivalencias } from "../models/equivalenciasModel.js";

export const mostrarEquivalencias = async (req, res) => {
    try {
        const equivalencias = await obtenerEquivalencias();

        const formattedEquivalencias = equivalencias.map(row => ({
            id_equivalencia: row.id_equivalencia,
            plan18: row.materias_plan18.split(', '),
            plan24: row.materias_plan24
        }));

        console.log(formattedEquivalencias);
        res.json(formattedEquivalencias);
    } catch (error) {
        console.error("❌ Error al mostrar equivalencias:", error.message);
        res.status(500).send("Error interno del servidor");
    }
};
