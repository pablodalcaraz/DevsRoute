import connection from "../database/db.js";

export const obtenerEquivalencias = async (req, res) => {
  try {
    const query = `
        SELECT GROUP_CONCAT(m18.nombre_materia SEPARATOR ', ') AS materias_plan18, m24.nombre_materia AS materias_plan24
        FROM equivalencias e
        INNER JOIN equivalencias_detalle ed ON ed.id_equivalencia = e.id_equivalencia
        INNER JOIN materias m18 ON m18.id_materia = ed.id_materia
        INNER JOIN materias m24 ON m24.id_materia = e.id_materia
        GROUP BY e.id_equivalencia, m24.nombre_materia;
        `;
        const [results] = await connection.execute(query)
        return results
  } catch (error) {
    console.error("❌ Error al obtenerMateriasPorPlanes:", error);
    throw error;
  }
};

