import { FaGithub } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <>
  <div className="footer">
    <div className="text-footer">
      <p>© 2024 pablodalcaraz. Todos los derechos reservados.</p>
    </div>
    <div className="icons">
      <a href="https://github.com/pablodalcaraz/DevsRoute.git" target="_blank" className="github">
        <FaGithub />
      </a>
      <a href="https://www.linkedin.com/in/pablo-alcaraz-822636186/" target="_blank" className="linkedin">
        <FaLinkedin />
      </a>
      <a href="https://portfoliopabloalcaraz.netlify.app/" target="_blank" className="web">
        <TfiWorld />
      </a>
    </div>
  </div>
</>

  )
}

export default Footer
