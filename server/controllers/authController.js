import { obtenerUsuarioPorMail } from "../models/usuarioModel.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res
        .status(400)
        .json({ error: "Email y contraseña son requeridos" });
    }

    const usuarios = await obtenerUsuarioPorMail(mail);

    const usuario = usuarios[0];
     

    if (!usuario.password) {
      return res.status(400).send("Error al recuperar la contraseña");
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password);

    console.log("Password Match Result:", passwordMatch);

    req.session.usuario = {
      dni_alumno: usuario.dni_alumno,
      nombre_alumno: usuario.nombre_alumno,
      apellido_alumno: usuario.apellido_alumno,
      mail: usuario.mail,
      id_plan_de_estudio: usuario.id_plan_de_estudio,
    };

    req.session.save((error) => {
      if (error) {
        return res.status(500).json({ error: "Error al guardar la sesión" });
      } else {
        return res.status(200).json({ usuario: req.session.usuario }); 
      }
    });
    
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};



export const verificarSesion = (req,res) => {
  if (req.session && req.session.usuario) {
    res.json({ usuario: req.session.usuario})
  } else {
    res.json({ usuario: null })
  }
}

export const cerrarSesion = (req,res) => {
  req.session.destroy((err) => {
    if(err){
      return res.status(500).json({ error: 'No se puede cerrar la sesión.'})
    }
    res.json({ success: true})
  })
}