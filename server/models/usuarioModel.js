import connection from "../database/db.js";

export const crearUsuario = async (dni_alumno, password) => {
    try {
        const query = `
        INSERT INTO usuario(dni_alumno, password)VALUES(?,?)
        `
        const [result] = await connection.execute(query,[dni_alumno,password])
        return result[0]
    } catch (error) {
        console.error('❌ Error al crearUsuario:', error);
        throw error;
    }
}

export const obtenerUsuarioPorMail = async (mail) => {
    try {
        if (!mail) {
            throw new Error('El parámetro dni_alumno no puede ser undefined');
        }
        const query = `
        SELECT u.*,a.*
        FROM usuario u
        JOIN alumno a ON a.dni_alumno = u.dni_alumno
        WHERE a.mail = ?
        `
        const [result] = await connection.execute(query, [mail])

        return result
    } catch (error) {
        console.error('❌ Error al obtenerUsuarioPorDni:', error);
        throw error
    }
}