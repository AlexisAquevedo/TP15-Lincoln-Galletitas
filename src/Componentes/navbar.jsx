import { Link, useLocation } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
  const location = useLocation();

  const getHeaderText = () => {
    switch (location.pathname) {
      case "/venta":
        return "Crear Venta";
      case "/encuesta":
        return "Encuesta de Satisfaccion";
      case "/":
        return "Estado de las Galletas";
      default:
        return "Bienvenido";
    }
  };
  return (
    <>
      <div className="nav">
        <div className="titulo">
          <h1>LINCOLN</h1>
        </div>
        <div className="acciones">
          <Link to={"/"} className="personal">
            <h2>Estado Galletas</h2>
          </Link>
          <Link to={"/venta"} className="personal">
            <h2>Nueva Venta</h2>
          </Link>
          <Link to={"/encuesta"} className="personal">
            <h2>Encuesta</h2>
          </Link>
        </div>
        <div className="locacion">{getHeaderText()}</div>
      </div>
    </>
  );
}
export default NavBar;
