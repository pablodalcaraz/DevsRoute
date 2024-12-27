import PropTypes from "prop-types";
import { useState } from "react";
import { Modal } from "react-bootstrap";


const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL ||'http://localhost:3000'

export const Login = ({ handleSwitchToRegister, handleCloseModal, setUsuario }) => {
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [mensajeBienvenida, setMensajeBienvenida] = useState("");

  const validarLogin = (formData) => {
    const newErrors = {};
    if (!formData.get("mail")) newErrors.mail = "*El email es obligatorio";
    if (!formData.get("password")) newErrors.password = "*El password es obligatorio";
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newErrors = validarLogin(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
        credentials: "include",
      });
  
      const result = await response.json();
      if (response.ok) {
        setUsuario(result.usuario);
        localStorage.setItem('usuario', JSON.stringify(result.usuario)); 
        handleMensajeBienvenida(result.usuario.nombre_alumno); 
      } else {
        console.error("Error del servidor:", result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error("Error en el fetch:", error);
      alert("Error al conectarse al servidor");
    }
  };
  

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleMensajeBienvenida = (nombre_alumno) => {
    const message = `Hola, ${nombre_alumno}! Has iniciado sesión!🔓`;
    setMensajeBienvenida(message);
    setShowModal(true); 
  
    setTimeout(() => {
      setShowModal(false); 
      handleCloseModal(); 
    }, 3000);
  };
  

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="mail" className="form-label">
            <strong> </strong>
          </label>
          <input
            type="email"
            className="form-control"
            id="mail"
            name="mail"
            onFocus={() => clearError("mail")}
            placeholder="Ingresá tu email..."
          />
          {errors.mail && (
            <div className="text-primary" style={{ fontSize: "10px", marginLeft: "5px" }}>
              {errors.mail}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <strong> </strong>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onFocus={() => clearError("password")}
            placeholder="Ingresá tu password..."
          />
          {errors.password && (
            <div className="text-primary" style={{ fontSize: "10px", marginLeft: "5px" }}>
              {errors.password}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary mt-4 w-100">
          Iniciar Sesión
        </button>
      </form>
      <div className="card-footer text-center mb-4">
        <small style={{ color: "#fefefe" }}>
          ¿No tienes una cuenta?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSwitchToRegister();
            }}
          >
            <strong className="registrate-aqui" style={{ color: "#fefefe", fontSize: "15px" }}>
              Regístrate aquí
            </strong>
          </a>
        </small>
      </div>
      <Modal show={showModal} className="custom-modal-bv">
        <Modal.Body className="modal-body-bv">
          <p style={{ color: "#fff", textAlign: "center", margin: 0 }}>{mensajeBienvenida}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

Login.propTypes = {
  handleSwitchToRegister: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  setUsuario: PropTypes.func.isRequired,
};
