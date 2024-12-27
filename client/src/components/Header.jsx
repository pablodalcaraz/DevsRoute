import { Register } from "../Register";
import { Login } from "../Login";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Modal } from "react-bootstrap";
import Logo from '../images/logo.png'


const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:3000'

export const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentForm, setCurrentForm] = useState("register");
  const [usuario, setUsuario] = useState(null);
  const [showBtnLogout, setShowBtnLogout] = useState(false);
  const [showMessageLogout, setShowMessageLogout] = useState(false);
  const [messageLogout, setMessageLogout] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/session`, { credentials: "include" })
      .then((res) => {
        console.log("Respuesta del servidor obtenida:", res);
        if (!res.ok) {
          throw new Error("Error al obtener la sesión");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.usuario) {
          setUsuario(data.usuario);
        }
      })
      .catch((error) =>
        console.error("Error al obtener la sesión del usuario:", error)
      );
  }, []);

  const handleLogout = () => {
    fetch(`${API_BASE_URL}/api/logout`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cerrar sesión");
        }
        return res.json();
      })
      .then(() => {
        setUsuario(null);
        handleCloseModal();
        setShowBtnLogout(false);
        mostrarMensajeLogout();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  const mostrarMensajeLogout = () => {
    const message = "¡La sesión se ha cerrado!🔒";
    console.log("Mostrando mensaje de logout");
    setTimeout(() => {
      setMessageLogout(message);
      setShowMessageLogout(true);
      setTimeout(() => {
        setShowMessageLogout(false);
      }, 3000);
    });
  };

  const handleOpenModal = (form) => {
    setCurrentForm(form);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const toggleLogoutButton = () => {
    setShowBtnLogout(!showBtnLogout);
  };

  useEffect(() => {
    const modalContent = document.querySelector(".modal-content");
    const modalBody = document.querySelector(".modal-body");

    if (modalContent && modalBody) {
      if (showModal) {
        if (currentForm === "login") {
          modalContent.style.height = "370px";
          modalBody.style.overflowY = "hidden";
        } else if (currentForm === "register") {
          modalContent.style.height = "auto";
          modalBody.style.overflowY = "auto";
          modalBody.style.maxHeight = "500px";
        }
      } else {
        modalContent.style.height = "";
        modalBody.style.overflowY = "";
        modalBody.style.maxHeight = "";
      }
    }
  }, [currentForm, showModal]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={Logo}
              style={{ width: "100px", height: "auto", paddingLeft: "20px" }}
            ></img>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <GiHamburgerMenu style={{ color: "#ffa832", fontSize: "30px" }} />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" style={{ paddingTop: "5px" }}>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <strong style={{color: "#ffa832"}}>Home</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/planes">
                  <strong style={{color: "#ffa832"}}>Planes Vigentes</strong>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/equivalencias">
                  <strong style={{color: "#ffa832"}}>Equivalencias</strong> 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/mi-carrera">
                  <strong style={{color: "#ffa832"}}>Mi Carrera</strong>
                </Link>
              </li>
            </ul>
            <div className="login">
              {usuario ? (
                <>
                  <strong style={{ fontSize: "15px" }}>
                    {usuario.apellido_alumno}, {usuario.nombre_alumno}
                  </strong>
                  <button
                    style={{ background: "none", border: "none" }}
                    onClick={toggleLogoutButton}
                  >
                    <FaUserCircle className="user-icon" />
                  </button>
                  {showBtnLogout && (
                    <button
                      className="btn btn-success"
                      style={{
                        position: "absolute",
                        right: "40px",
                        marginTop: "95px"
                      }}
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </button>
                  )}
                </>
              ) : (
                <a
                  onClick={() => handleOpenModal("login")}
                  style={{ cursor: "pointer" }}
                >
                  <strong style={{ fontSize: "15px" }}>Iniciar Sesión</strong>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "grid" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {currentForm === "register"
                    ? "Formulario de Registro"
                    : "Iniciar Sesión"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                {currentForm === "register" ? (
                  <Register
                    handleSwitchToLogin={() => setCurrentForm("login")}
                  />
                ) : (
                  <Login
                    handleSwitchToRegister={() => setCurrentForm("register")}
                    handleCloseModal={handleCloseModal}
                    setUsuario={setUsuario}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal show={showMessageLogout} className="custom-modal-bv">
        <Modal.Body
          style={{
            backgroundColor: "#332f2c",
            borderRadius: "5px",
            height: "100%"
          }}
          className="modal-body-bv mt-5"
        >
          <p style={{ color: "#fff", textAlign: "center", margin: 0 }}>
            {messageLogout}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};
