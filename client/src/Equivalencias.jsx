import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import React, { useEffect, useState } from "react";


const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:3000'

export const Equivalencias = () => {
  const [equivalencias, setEquivalencias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquivalencias = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/equivalencias`);
        if (!response.ok) {
          throw new Error("Error al obtener las equivalencias");
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setEquivalencias(data);
        } else {
          throw new Error("La respuesta no es un arreglo");
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEquivalencias();
  }, []);

  return (
    <>
      <Header />
      <div
        className="container text-center equivalencias-container mt-5"
        style={{ color: "white" }}
      >
        <h2 className="mt-5">EQUIVALENCIAS AUTOMÁTICAS </h2>
        <div className="titulo-planes mt-4" >
          <p>Plan RR N°12180003-ULP-2018 </p>
          <p>Plan RR Nº5090003-ULP-2024</p>
        </div>

        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div className="equivalencias">
            {equivalencias.length === 0 ? (
              <p>No hay equivalencias para mostrar</p>
            ) : (
              equivalencias.map((equivalencia, index) => (
                <div key={index} className="equivalencia-item">
                  <div className="materias plan18">
                    {equivalencia.plan18.map((materia, i) => (
                      <div key={i} className="materia-cuadro">
                        {materia}
                      </div>
                    ))}
                  </div>
                  <div className="linea">
                    <svg width="100%" height="100%">
                      <line
                        x1="0"
                        y1="50%"
                        x2="100%"
                        y2="50%"
                        stroke="white"
                        strokeWidth="5"
                      />
                    </svg>
                  </div>
                  <div className="materias plan24">
                    <div className="materia-cuadro plan24-cuadro">
                      {equivalencia.plan24 || "Nombre no disponible"}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
