import connection from '../database/db.js';

export const insertarMateria = async (dni_alumno, id_materia) => {
    try {
        const query = `
        INSERT INTO aprobadas(dni_alumno, id_materia) VALUES (?, ?)
        `;
        await connection.execute(query, [dni_alumno, id_materia]);
        console.log('Materia agregada exitosamente');
    } catch (error) {
        console.error('❌ Error al insertarMateria:', error);
        throw error;
    }
};

export const removerMateria = async (dni_alumno,id_materia) => {
    try {
        const query = `
        DELETE FROM aprobadas
        WHERE dni_alumno = ? AND id_materia = ?
        `
        await connection.execute(query, [dni_alumno,id_materia])
        console.log('Materia removida de la base de datos')
    } catch (error) {
        console.error('❌ Error al removerMateria:', error);
        throw error;
    }
}

export const mostrarAprobadas = async (dni_alumno) => {
    try {
        const query = `
        SELECT a.*, m.nombre_materia 
        FROM aprobadas a
        JOIN materias m ON m.id_materia = a.id_materia
        WHERE a.dni_alumno = ? 
        `
        const [results] = await connection.execute(query, [dni_alumno])
        return results
    } catch (error) {
        console.error('❌ Error al mostrarAprobadas:', error);
        throw error;
    }
}

export const borrarAprobadas = async (dni_alumno) => {
    try {
        const query = `
        DELETE FROM aprobadas
        WHERE dni_alumno = ?
        `
        const [results] = await connection.execute(query, [dni_alumno])
        return results
    } catch (error) {
        console.error('❌ Error al borrarAprobadas:', error);
        throw error;
    }
}