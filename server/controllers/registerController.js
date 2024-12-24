import bcrypt from 'bcrypt'
import { crearAlumno } from "../models/alumnoModel.js"
import { crearUsuario } from "../models/usuarioModel.js"

export const registrarUsuario = async (req,res) => {
    try {
        const {dni_alumno, nombre_alumno,apellido_alumno, id_plan_de_estudio,mail, password} = req.body
        if (!dni_alumno || !nombre_alumno || !apellido_alumno || !mail || !id_plan_de_estudio || !password) {
            return res.status(400).send('Todos los campos son obligatorios');
          }
        const hashedPassword = await bcrypt.hash(password,10)   
        
        await crearAlumno(dni_alumno, nombre_alumno, apellido_alumno,mail, id_plan_de_estudio)
        await crearUsuario(dni_alumno,hashedPassword)

        return res.status(200).send('Usuario registrado exitosamente')
    } catch (error) {
        console.error('❌ Error al registrarUsuario:', error);
        return res.status(500).send('Error interno del servidor');
    }
}