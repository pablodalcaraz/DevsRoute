import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Register } from './Register.jsx';
import { Home } from './Home.jsx';
import { Planes } from "./Planes.jsx";
import { Login } from "./Login.jsx";
import { MiCarrera } from "./MiCarrera.jsx";
import { Equivalencias } from "./Equivalencias.jsx";

export const App = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioAlmacenado = localStorage.getItem('usuario');
    if (usuarioAlmacenado) {
      setUsuario(JSON.parse(usuarioAlmacenado));
    }
  }, []);

  const handleSwitchToLogin = () => {
    navigate('/login');
  };

  const handleSwitchToRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register handleSwitchToLogin={handleSwitchToLogin} />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/login" element={<Login handleSwitchToRegister={handleSwitchToRegister} handleCloseModal={() => navigate('/')} setUsuario={setUsuario} />} />
        <Route path="/mi-carrera" element={<MiCarrera />} />
        <Route path="/equivalencias" element={<Equivalencias />} />
      </Routes>
    </>
  );
};

export default App;

