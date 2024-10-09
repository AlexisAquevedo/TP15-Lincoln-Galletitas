import { Link } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
    
    return (
        <>
        <div className="nav">
            <div className="titulo">
                <Link to={"/"}>
                    <h1>Lincoln</h1>
                </Link>
            </div>
            <div className="acciones">
                <Link to={"/venta"} >Venta</Link>
                <Link to={"/encuesta"} >Encuesta</Link>
            </div>
        </div>
        </>
    ); 
}
export default NavBar;