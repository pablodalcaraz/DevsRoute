import { useState, useEffect } from "react";
import PropTypes from "prop-types";


const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:3000'

export const Register = ({handleSwitchToLogin}) => {
  const [planes, setPlanes] = useState([]);
  const [errors, setErrors] = useState({});
  const [registroExitoso, setRegistroExitoso] = useState(false);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/planes`);
        const data = await response.json();
        setPlanes(data);
      } catch (error) {
        console.error("Error al obtener los planes", error);
      }
    };
    fetchPlanes();
  }, []);

  const validarRegistro = (formData) => {
    const newErrors = {};
    if (!formData.get("dni_alumno"))
      newErrors.dni_alumno = "*El DNI es obligatorio";
    if (!formData.get("nombre_alumno"))
      newErrors.nombre_alumno = "*El nombre es obligatorio";
    if (!formData.get("apellido_alumno"))
      newErrors.apellido_alumno = "*El apellido es obligatorio";
    if (!formData.get("mail")) newErrors.mail = "*El e-mail es obligatorio";
    if (!formData.get("id_plan_de_estudio"))
      newErrors.id_plan_de_estudio = "*El plan es obligatorio";
    if (!formData.get("password1"))
      newErrors.password1 = "*La contraseña es obligatoria";
    if (formData.get("password1") !== formData.get("password"))
      newErrors.password = "*Las contraseñas no coinciden";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newErrors = validarRegistro(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      setRegistroExitoso(true);
      
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <div className="container">
      {registroExitoso ? (
        <div className="registro-exitoso text-center mt-5">
          <h2>¡Registro exitoso!</h2>
          <p style={{color:'white'}}>Te registraste correctamente.</p>
          <a className="login-redirect"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSwitchToLogin();
            }}
          >Inicia sesión</a>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="dni"
              className="form-label label-left"
              style={{ marginLeft: "5px" }}
            >
              <strong> </strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="dni"
              name="dni_alumno"
              onFocus={() => clearError("dni_alumno")}
              placeholder='Ingresá tu DNI...'
            />
            {errors.dni_alumno && (
              <div
                className="text-primary"
                style={{ fontSize: "10px", marginLeft: "5px" }}
              >
                {errors.dni_alumno}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="nombre"
              className="form-label label-left"
              style={{ marginLeft: "5px" }}
            >
              <strong> </strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre_alumno"
              onFocus={() => clearError("nombre_alumno")}
              placeholder='Ingresá tu nombre...'
            />
            {errors.nombre_alumno && (
              <div
                className="text-primary"
                style={{ fontSize: "10px", marginLeft: "5px" }}
              >
                {errors.nombre_alumno}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="apellido"
              className="form-label label-left"
              style={{ marginLeft: "5px" }}
            >
              <strong> </strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              name="apellido_alumno"
              onFocus={() => clearError("apellido_alumno")}
              placeholder='Ingresá tu apellido...'
            />
            {errors.apellido_alumno && (
              <div
                className="text-primary"
                style={{ fontSize: "10px", marginLeft: "5px" }}
              >
                {errors.apellido_alumno}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label label-left"
              style={{ marginLeft: "5px" }}
            >
              <strong> </strong>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="mail"
              onFocus={() => clearError("mail")}
              placeholder='Ingresá tu e-mail...'
            />
            {errors.mail && (
              <div
                className="text-primary"
                style={{ fontSize: "10px", marginLeft: "5px" }}
              >
                {errors.mail}
              </div>
            )}
          </div>
          <div className="optionPlan mb-3">
            <label
              htmlFor="planEstudio"
              className="form-label label-left"
              style={{ marginLeft: "5px" }}
            >
              <strong> </strong>
            </label>
            <select
              className="form-select"
              id="planEstudio"
              name="id_plan_de_estudio"
              onFocus={() => clearError("id_plan_de_estudio")}
            >
              <option key="" value="">
                Selecciona un plan...
              </option>
              {planes.map((plan) => (
                <option
                  key={plan.id_plan_de_estudio}
                  value={plan.id_plan_de_estudio}
                >
                  {plan.nombre_plan}
                </option>
              ))}
            </select>
            {errors.id_plan_de_estudio && (
              <div
                className="text-primary"
                style={{ fontSize: "10px", marginLeft: "5px" }}
              >
                {errors.id_plan_de_estudio}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label label-left"
              style={{ marginLeft: "5px" }}
            >
              <strong> </strong>
            </label>
            <input
              type="password"
              className="form-control"
              id="password1"
              name="password1"
              onFocus={() => clearError("password1")}
              placeholder='Ingresá un password...'
            />
            {errors.password1 && (
              <div
                className="text-primary"
                style={{ fontSize: "10px", marginLeft: "5px" }}
              >
                {errors.password1}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="repassword"
              className="form-label label-left"
              style={{ marginLeft: "5px" }}
            >
              <strong> </strong>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onFocus={() => clearError("password")}
              placeholder='Repetí tu password...'
            />
            {errors.password && (
              <div
                className="text-primary"
                style={{ fontSize: "10px", marginLeft: "5px" }}
              >
                {errors.password}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-4 mb-4 w-100" >
            Registrar
          </button>
        </form>
      )}
    </div>
  );
};
Register.propTypes = {
  handleSwitchToLogin: PropTypes.func.isRequired,
};
export default Register;

