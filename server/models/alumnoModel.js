import connection from '../database/db.js'

export const crearAlumno = async (dni_alumno, nombre_alumno, apellido_alumno,mail, id_plan_de_estudio) => {
    try {
        const query = `
        INSERT INTO alumno(dni_alumno, nombre_alumno, apellido_alumno,mail, id_plan_de_estudio)VALUES(?,?,?,?,?)
        `
        const params = [
            dni_alumno, 
            nombre_alumno, 
            apellido_alumno,
            mail, 
            id_plan_de_estudio
        ]
        const [result] = await connection.execute(query,params)
        return result
    } catch (error) {
        console.error('❌ Error al crearAlumno:', error);
        throw error;
    }
}

export const actualizarPlanPorDni = async (dni_alumno, nombre_alumno, apellido_alumno, mail, id_plan_de_estudio) => {
    try {
        const query = `
        UPDATE alumno
        SET
        dni_alumno = COALESCE(?, dni_alumno),
        nombre_alumno = COALESCE(?, nombre_alumno),
        apellido_alumno = COALESCE(?, apellido_alumno),
        mail = COALESCE(?, mail),
        id_plan_de_estudio = COALESCE(?, id_plan_de_estudio)
        WHERE dni_alumno = ?
        `;
        const params = [dni_alumno, nombre_alumno, apellido_alumno, mail, id_plan_de_estudio, dni_alumno];
        const [result] = await connection.execute(query, params);
        return result;
    } catch (error) {
        console.error('❌ Error al actualizarPlanPorDni:', error);
        throw error;
    }
};



