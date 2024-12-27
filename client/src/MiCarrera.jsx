import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Modal } from "react-bootstrap";


const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:3000'

export const MiCarrera = () => {
  const [materias, setMaterias] = useState([]);
  const [contenedorMaterias, setContenedorMaterias] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mensajeMotivacional, setMensajeMotivacional] = useState("");
  const [showModalExito, setShowModalExito] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [showModalBorrar, setShowModalBorrar] = useState(false);
  const [mensajeBorrar, setMensajeBorrar] = useState("");
  const [showModalActualizar, setShowModalActualizar] = useState(false);
  const [mensajeActualizar, setMensajeActualizar] = useState("");

  const fetchMaterias = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mi-carrera`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      const data = await response.json();
      setMaterias(data);
    } catch (error) {
      setError("Error al obtener las materias.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  const fetchMateriasAprobadas = async () => { 
    try { 
      const response = await fetch(`${API_BASE_URL}/api/ver-aprobadas`, 
       { method: "GET", 
       credentials: "include", 
       }); 
       if (!response.ok) { 
       throw new Error(`Error en la solicitud: ${response.status}`); 
      } 
      const data = await response.json(); 
      console.log("Materias aprobadas obtenidas:", data); 
      if (Array.isArray(data)) { 
        setContenedorMaterias(data); 
        } else { 
          console.error("La respuesta no es un arreglo:", data); 
        }
      
    } catch (error) { 
      setError("Error al obtener las materias aprobadas."); 
      console.error(error); 
    } 
  }; 

  useEffect(() => {
    fetchMateriasAprobadas()
  },[])

  const handleDragStart = (e, materia) => {
    e.dataTransfer.setData("materiaId", materia.id_materia.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const mensajes = {
    "Primera materia agregada": "¡Oficialmente has comenzado! ¡Bien hecho!👏👏👏", 
    "Otra materia agregada": "¡Genial! ¡Lo hiciste!",
    "Programación 2": "¿Tuviste la sensación de que aprendiste mucho en esta materia?🤔🤗",
    "Laboratorio I": "¡Felicitaciones por tu primer proyecto en Java!🥳",
    "Estructura de Datos y Algoritmos": "¡Tu 🧠 nunca se olvidará de EDA!🤣🤣🤣",
    "Programación Web": "¡Excelente! ¡Vamos por más!😎",
    "Laboratorio II": "¡Trabajaste mucho! ¡El esfuerzo rindió frutos!🥳",
    "Programación en Entorno .NET": "¡Las tecnologías de Microsoft son fundamentales!✅",
    "Laboratorio de Programación III - Increíble": "¡Increíble todo lo que has logrado!🤓",
    "Laboratorio de Programación III - Impresionante": "¡Impresionante todo lo que aprendiste!💻♥️",
    "Redes": "¡Estás en la recta final!🏃‍♂️‍➡️➡️",
    "Seguridad Informática": "¡Un área muy interesante para desarrollarte!🤓",
    "Última materia": "¡Felicitaciones!🎓 ¡Lo has Logrado!🥳🎊",
    "Mensaje final 1": "¡Sé que hiciste un gran esfuerzo para lograr tu meta!😓"
  };
  const handleTouchStart = (e, materia) => {
    e.dataTransfer = e.target; // Asociar el elemento
    setTouchedMateria(materia); // Guardar la materia que se toca
  };
  
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
  
    if (target && target.classList.contains("seleccionadas")) {
      target.style.border = "2px solid #4caf50"; // Indicar área válida
    } else {
      target.style.border = "2px dashed #4caf50";
    }
  };
  
  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
  
    if (target && target.classList.contains("seleccionadas")) {
      handleDrop({ target }, touchedMateria); // Simular el drop
    }
  };
  
  
  const handleDrop = (e) => {
    const materiaId = e.dataTransfer.getData("materiaId");
    const materia = materias.find((materia) => materia.id_materia.toString() === materiaId);

    if (materia && !contenedorMaterias.some(m => m.id_materia === materia.id_materia)) {
        setContenedorMaterias([...contenedorMaterias, materia]);
        

        if (contenedorMaterias.length === 0) {
            mostrarMensajeMotivacional("Primera materia agregada");
        } else {
            let mensajeMostrado = false;
            switch (materia.id_materia) {
                case 3:
                    mostrarMensajeMotivacional("Programación 2");
                    mensajeMostrado = true;
                    break;
                case 4 :
                case 25 :
                    mostrarMensajeMotivacional("Laboratorio I");
                    mensajeMostrado = true;
                    break;
                case 5 :
                case 28:
                    mostrarMensajeMotivacional("Estructura de Datos y Algoritmos");
                    mensajeMostrado = true;
                    break;
                case 7 :
                case 27:
                    mostrarMensajeMotivacional("Programación Web");
                    mensajeMostrado = true;
                    break;
                case 11:
                case 29:
                    mostrarMensajeMotivacional("Laboratorio II");
                    mensajeMostrado = true;
                    break;
                case 13:
                case 32:
                    mostrarMensajeMotivacional("Programación en Entorno .NET");
                    mensajeMostrado = true;
                    break;
                
                case 17: 
                case 35:
                    mostrarMensajeMotivacional("Laboratorio de Programación III");
                    mensajeMostrado = true;
                    break;
                case 19: 
                case 34:
                    mostrarMensajeMotivacional("Redes");
                    mensajeMostrado = true;
                    break;
                case 20:
                case 37:
                    mostrarMensajeMotivacional("Seguridad Informática");
                    mensajeMostrado = true;
                    break;
                default:
                    mostrarMensajeMotivacional("Otra materia agregada");
                    break;
            }

            if (contenedorMaterias.length + 1 === materias.length) {
                mostrarMensajeFinal();
            }
        }
    }
};

const mostrarMensajeMotivacional = (materiaNombre) => { 
  const mensaje = mensajes[materiaNombre]; 
  if (mensaje) { 
    setMensajeMotivacional(mensaje); 
    setShowModal(true); 
    setTimeout(() => { 
      setShowModal(false); 
    }, 3000); 
  } 
};

const mostrarMensajeFinal = () => {
    const mensajesFinales = [
        "¡Felicitaciones!🎓 ¡Lo has logrado!🥳🎊👑",
        "¡Se que hiciste un gran esfuerzo para lograr tu meta!😓",
        "¡Pero valió la pena!😀",
        "¡Te esperan nuevos desafíos en el ámbito profesional!💻🦾",
        "¡Muchos éxitos!👋🫂"
    ];

    mensajesFinales.forEach((mensaje, index) => {
        setTimeout(() => {
            setMensajeMotivacional(mensaje);
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
        }, index * 4000);
    });
};
  

  const progreso = (contenedorMaterias.length / materias.length) * 100;

  const guardarMateria = async (materiaId) => {
    try {
        console.log(`Enviando id_materia: ${materiaId}`);
        const response = await fetch(`${API_BASE_URL}/api/guardar-materias`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              id_materia: materiaId 
            }),
            credentials: "include" 
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        console.log("Materia guardada exitosamente");
    } catch (error) {
        console.error("Error al guardar las materias:", error);
    }
};


const handleGuardarMaterias = () => { 
  const message = 'Materias guardadas ¡exitosamente!'
  contenedorMaterias.forEach(materia => { 
    console.log(`Guardando materia: ${materia.id_materia}`); 
    guardarMateria(materia.id_materia); 
  }); 
  setTimeout(() => {
    setMensajeExito(message)
    setShowModalExito(true)
    setTimeout(() => {
      setShowModalExito(false)
    }, 3000)
  })
};

const borrarMateria = async (materiaId) => {
  try {
    console.log(`Eliminando id_materia: ${materiaId}`);
    const response = await fetch(`${API_BASE_URL}/api/borrar-materias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_materia: materiaId,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    console.log("Materia eliminada exitosamente");
  } catch (error) {
    console.error("Error al eliminar la materia:", error);
  }
};

const handleRemoveMateria = async (materiaId) => {
  try {

    await borrarMateria(materiaId);

    setContenedorMaterias((prevMaterias) => {
      const materiasActualizadas = prevMaterias.filter(
        (materia) => materia.id_materia !== materiaId
      );
      const materiaEliminada = prevMaterias.find(
        (materia) => materia.id_materia === materiaId
      );

      if (materiaEliminada) {
        const message = `${materiaEliminada.nombre_materia} se eliminó de tus materias aprobadas.`;
        setMensajeBorrar(message);
        setShowModalBorrar(true);
        setTimeout(() => {
          setShowModalBorrar(false);
        }, 3000);
      }
      return materiasActualizadas;
    });
  } catch (error) {
    console.error("Error al eliminar la materia:", error);
  } 
};

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  

  const getProgressColor = (percentage) => {
    if (percentage === 100) {
      return "cyan";
    }
    const r = percentage < 50 ? 255 : Math.floor(510 - 5.1 * percentage);
    const g = percentage > 50 ? 255 : Math.floor(5.1 * percentage);
    const b = 0;
    return `rgb(${r},${g},${b})`;
  };

  

  const actualizarPlan = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/update-plan`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el plan de estudio.');
        }

        const message = await response.text(); 
        setTimeout(() => {
          setMensajeActualizar(message)
          setShowModalActualizar(true)
          setTimeout(() => {
            setShowModalActualizar(false)
          },3000)
        })
        setInterval(() => {
          window.location.reload();
        },3000)
        
    } catch (error) {
        console.error('❌ Error al actualizar el plan:', error);
        alert('No se pudo actualizar el plan.');
    }
};
  
  return (
    <>
    <div
      className="container-fluid bg-dark"
      style={{ width: "100%", padding: "20px", boxSizing: "border-box" }}
    >
      <Header />
      <h2
        className="text-center mt-5 mb-4 text-light"
        style={{ paddingTop: "50px" }}
      >
        Materias de Mi Carrera
      </h2>
  
      {error && <p style={{ display: "none" }}>{error}</p>}
  
      <div className="container">
        <div className="text-warning" style={{ color: "white" }}>
          <p className="mb-4" style={{ display: "flex", gap: "5px" }}>
            Si te cambiaste de Plan de Estudio, podés actualizarlo haciendo clic
            <span
              className="text-danger"
              onClick={actualizarPlan}
              style={{ cursor: "pointer", textDecoration: "underline" }}
              role="button"
              aria-label="Actualizar Plan de Estudio"
            >
              acá
            </span>
          </p>
        </div>
  
        <div
          className="materias mb-4"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "5px 10px",
          }}
        >
          {materias.map((materia) => (
            <div
              className="materia"
              key={materia.id_materia}
              draggable
              onDragStart={(e) => handleDragStart(e, materia)}
              onTouchStart={(e) => handleTouchStart(e, materia)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                width: "150px",
                height: "70px",
                borderRadius: "5px",
                backgroundColor: getRandomColor(),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "move",
                padding: "10px",
                textAlign: "center",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "bold",
                position: "relative",
              }}
            >
              {materia.nombre_materia}
            </div>
          ))}
        </div>
  
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <div style={{ flexGrow: 2 }}>
            <div
              style={{
                height: "25px",
                backgroundColor: "#ddd",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progreso}%`,
                  backgroundColor: getProgressColor(progreso),
                  transition: "width 0.3s, background-color 0.3s",
                }}
              />
            </div>
            <p
              className="text-center"
              style={{ marginLeft: "10px", color: "white" }}
            >
              <strong
                className="text-warning"
                style={{ marginRight: "10px" }}
              >
                {progreso.toFixed(2)}
              </strong>
              % de progreso en tu carrera
            </p>
          </div>
        </div>
  
        <div
          className="seleccionadas"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            width: "100%",
            height: "300px",
            borderRadius: "5px",
            border: "2px dashed #4caf50",
            padding: "10px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            backgroundColor: "#fefefe",
            marginBottom: "20px",
          }}
        >
          {contenedorMaterias.length === 0 ? (
            <p style={{ opacity: "50%" }}>Arrastra las materias aquí</p>
          ) : (
            contenedorMaterias.map((materia) => (
              <div key={materia.id_materia}>
                <div
                  className="seleccionadas"
                  style={{
                    width: "146px",
                    height: "70px",
                    borderRadius: "5px",
                    backgroundColor: "#4caf50",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    position: "relative",
                    fontSize: "13px",
                    textAlign: "center",
                    margin: "0",
                  }}
                >
                  {materia.nombre_materia}
                  <button
                    onClick={() => handleRemoveMateria(materia.id_materia)}
                    className="btn-close"
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "12px",
                      color: "#fff",
                      opacity: "0.8",
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
  
        <button
          onClick={handleGuardarMaterias}
          className="btn btn-primary"
          style={{ marginBottom: "20px" }}
        >
          Guardar Materias
        </button>
      </div>
  
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="custom-modal"
      >
        <Modal.Body className="modal-body">{mensajeMotivacional}</Modal.Body>
      </Modal>
      <Modal
        show={showModalExito}
        onHide={() => setShowModalExito(false)}
        className="custom-modal"
      >
        <Modal.Body className="modal-body">{mensajeExito}</Modal.Body>
      </Modal>
      <Modal
        show={showModalBorrar}
        onHide={() => setShowModalBorrar(false)}
        className="custom-modal"
      >
        <Modal.Body className="modal-body">{mensajeBorrar}</Modal.Body>
      </Modal>
      <Modal
        show={showModalActualizar}
        onHide={() => setShowModalActualizar(false)}
        className="custom-modal"
      >
        <Modal.Body className="modal-body">{mensajeActualizar}</Modal.Body>
      </Modal>
    </div>
    <Footer />
  </>
  
  );
};
