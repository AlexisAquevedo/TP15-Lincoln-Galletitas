import { BrowserRouter, Routes, Route } from "react-router-dom"
import Encuesta from "./Paginas/formulario"
import Estado from "./Paginas/estado"
import './css/app.css'
import NuevoCliente from "./Paginas/Venta"
/*
Express: npm install express mysql cors body-parser
Mysql2: npm install mysql2
React-doom: npm install react-router-dom@6
boostrap: npm install bootstrap
Package.json:
  "type": "commonjs",
*/
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Estado></Estado>}/>
        <Route path="/encuesta" element={<Encuesta></Encuesta>}/>
        <Route path="/venta" element={<NuevoCliente></NuevoCliente>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
