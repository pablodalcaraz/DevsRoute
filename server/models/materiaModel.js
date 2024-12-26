import connection from '../database/db.js'

export const obtenerMateriaPorPlan = async (id_plan_de_estudio) => {
    try {
        const query = `
        SELECT *
        FROM materias
        WHERE id_plan_de_estudio = ?
        `
        const [results] = await connection.execute(query, [id_plan_de_estudio])
        return results
    } catch (error) {
        console.error('❌ Error al obtenerMateriaPorPlan:', error);
        throw error;
    }
}



