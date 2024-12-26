import React, { useState, useEffect } from "react";
import ReactIcon from '../images/react.png';
import NodeIcon from '../images/nodejs.png';
import MySqlIcon from '../images/mysql.png';

const Marquee = () => {
  const [mensajeIndex, setMensajeIndex] = useState(0);
  
  const mensajes = [
    '',
     'Hola! 🤗',
   
    'DevsRoute es una aplicación web para los estudiantes',
    'de la Tecnicatura en Desarrollo de Software de la ULP🤓',
    <>
      Desarrollada en 
      <img src={ReactIcon} alt="React" style={{ width: '30px', height: '30px', marginLeft: '5px' }} />
       
      <img src={NodeIcon} alt="Node.js" style={{ width: '30px', height: '30px', marginLeft: '5px' }} /> 
       y 
      <img src={MySqlIcon} alt="MySQL" style={{ width: '30px', height: '30px', marginLeft: '5px' }} />
    </>,
    "Registrarte y armar tu Ruta de desarrollador🏃‍➡️➡️",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMensajeIndex((prevIndex) => (prevIndex + 1) % mensajes.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [mensajes.length]);

  return (
    <div className="marquee">
      <div className="marquee-content">
        <span>{mensajes[mensajeIndex]}</span>
      </div>
    </div>
  );
};

export default Marquee;
