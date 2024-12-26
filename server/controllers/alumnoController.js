import { actualizarPlanPorDni } from "../models/alumnoModel.js";
import { borrarAprobadas } from "../models/aprobadasModel.js";

export const updatePlan = async (req, res) => {
    try {
        const dni_alumno = req.session.usuario?.dni_alumno;
        const id_plan_de_estudio_actual = req.session.usuario?.id_plan_de_estudio;
        
        if (!dni_alumno || id_plan_de_estudio_actual === undefined) {
            return res.status(400).send('Faltan datos para actualizar el plan de estudio.');
        }

       
        const nuevoIdPlan = id_plan_de_estudio_actual === 1 ? 2 : 1;

       
        await actualizarPlanPorDni(dni_alumno, null, null, null, nuevoIdPlan);
        await borrarAprobadas(dni_alumno)
      
        req.session.usuario.id_plan_de_estudio = nuevoIdPlan;

        res.status(200).send('Plan actualizado exitosamente.');
    } catch (error) {
        console.error('❌ Error al updatePlan:', error);
        return res.status(500).send('Error interno del servidor');
    }
};

