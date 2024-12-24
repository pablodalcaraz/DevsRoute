import { insertarMateria, removerMateria,mostrarAprobadas } from "../models/aprobadasModel.js";

export const agregarMateria = async (req, res) => {
    try {
        console.log('Sesion del usuario:', req.session.usuario);
        const dni_alumno = req.session.usuario ? req.session.usuario.dni_alumno : null;
        const { id_materia } = req.body;

        console.log('id materia: ',id_materia)
        console.log('dni alumno: ', dni_alumno)
        if (!dni_alumno) {
            return res.status(400).json({ error: "No se pudo obtener el dni del usuario" });
        }

        await insertarMateria(dni_alumno, id_materia);
        res.status(200).send('Materia agregada en la base de datos');
    } catch (error) {
        console.error("Error al agregarMateria:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const borrarMateria = async (req,res) => {
    try {
        console.log('Sesion del usuario:', req.session.usuario);
        const dni_alumno = req.session.usuario ? req.session.usuario.dni_alumno : null;
        const { id_materia } = req.body;

        console.log('id materia: ',id_materia)
        console.log('dni alumno: ', dni_alumno)
        if (!dni_alumno) {
            return res.status(400).json({ error: "No se pudo obtener el dni del usuario" });
        }
        await removerMateria(dni_alumno, id_materia)
        res.status(200).send('Materia borrada exitosamente')
    } catch (error) {
        console.error("Error al borrarMateria:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const verMateriasAprobadas = async (req,res) => {
    try {
        
        const dni_alumno = req.session.usuario ? req.session.usuario.dni_alumno : null;
        
        console.log('dni alumno: ', dni_alumno)
        if (!dni_alumno) {
            return res.status(400).json({ error: "No se pudo obtener el dni del usuario" });
        }
        const results  = await mostrarAprobadas(dni_alumno)
        res.status(200).json(results)
    } catch (error) {
        console.error("Error al verMateriasAprobadas:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}
