import { obtenerPlan } from "../models/planModel.js"
import { obtenerMateriaPorPlan } from "../models/materiaModel.js";

export const mostrarPlan = async (req,res) => {
    try {
        const results = await obtenerPlan(req,res)
        console.log(results)
        res.json(results)
    } catch (error) {
        console.error('❌ Error al mostrarPlan:', error); 
        res.status(500).send('Error al mostrar los planes de estudio');
    }
}



export const mostrarMaterias = async (req,res) => {
    try {
        const {id_plan_de_estudio} = req.query
        if (!id_plan_de_estudio) {
            return res.status(400).json({ error: "El id_plan_de_estudio es requerido" });
          }
        const results = await obtenerMateriaPorPlan(id_plan_de_estudio)
        res.json(results)
    } catch (error) {
        console.error("Error al mostrarMaterias:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}