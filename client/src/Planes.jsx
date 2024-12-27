import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";


const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:3000'

export const Planes = () => {
  const [planes, setPlanes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [idPlanSeleccionado, setIdPlanSeleccionado] = useState("");
  
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

  const handleChangePlan = (e) => {
    setIdPlanSeleccionado(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idPlanSeleccionado) {
      alert("Por favor, selecciona un plan de estudio.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/materias?id_plan_de_estudio=${idPlanSeleccionado}`
      );
      const data = await response.json();
      setMaterias(data);
    } catch (error) {
      console.error("Error al obtener las materias", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <form className="form-plan mt-5" onSubmit={handleSubmit}>
          <label htmlFor="planEstudio" className="form-label label-left">
            <strong>Plan de Estudio</strong>
          </label>
          <div className="row align-items-center">
            <div className="col-12 col-md-8">
              <select
                className="form-select bg-dark"
                style={{width:'160px'}}
                id="planEstudio"
                name="id_plan_de_estudio"
                value={idPlanSeleccionado}
                onChange={handleChangePlan}
                required
              >
                <option value="">Selecciona un plan...</option>
                {planes.map((plan) => (
                  <option
                    key={plan.id_plan_de_estudio}
                    value={plan.id_plan_de_estudio}
                  >
                    {plan.nombre_plan}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-4">
              <button className="btn btn-success w-100" type="submit">
                Ver
              </button>
            </div>
          </div>
        </form>

        {idPlanSeleccionado && (
          <div className="plan">
            <div className="tabla table-responsive mb-4">
              <table className="table table-bordered">
                <thead
                  className="text-center"
                  style={{ backgroundColor: "#0a0a0a", color: "#dcdcdc" }}
                >
                  <tr>
                    {idPlanSeleccionado === "1" ? (
                      <>
                        <th>N°</th>
                        <th>Materia</th>
                        <th>Año</th>
                        <th>Cuatrimestre</th>
                        <th>Bimestre</th>
                        <th>Total horas</th>
                      </>
                    ) : idPlanSeleccionado === "2" ? (
                      <>
                        <th>N°</th>
                        <th>Materia</th>
                        <th>Año</th>
                        <th>Cuatrimestre</th>
                        <th>CH</th>
                        <th>CHP</th>
                        <th>CHT</th>
                      </>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {materias.length > 0 ? (
                    materias.map((materia, index) => (
                      <tr key={materia.id_materia}>
                        <td>{index + 1}</td>
                        <td>{materia.nombre_materia}</td>
                        <td>{materia.anio}</td>
                        <td>{materia.cuatrimestre}</td>
                        {idPlanSeleccionado === "1" ? (
                          <>
                            <td>{materia.bimestre}</td>
                            <td>{materia.ch}</td>
                          </>
                        ) : idPlanSeleccionado === "2" ? (
                          <>
                            <td>{materia.ch}</td>
                            <td>{materia.chp}</td>
                            <td>{materia.cht}</td>
                          </>
                        ) : null}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={idPlanSeleccionado === "1" ? "6" : "7"} className="text-center">
                        No hay materias disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
