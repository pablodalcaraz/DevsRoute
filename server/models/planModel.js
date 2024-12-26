import connection from "../database/db.js"

export const obtenerPlan = async (req,res) => {
    try {
        const query = `
        SELECT *
        FROM plan_de_estudio
        `
        const [results] = await connection.execute(query)
        return results
    } catch (error) {
        console.error('❌ Error al obtenerPlan:', error);
        throw error;
    }
}