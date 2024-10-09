import { BrowserRouter, Routes, Route } from "react-router-dom"
import Encuesta from "./Paginas/encuesta"
import Estado from "./Paginas/estado"
import Venta from "./Paginas/Venta"

/*
Express: npm install express mysql cors body-parser
Mysql2: npm install mysql2
React-doom: npm install react-router-dom@6
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
        <Route path="/venta" element={<Venta></Venta>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
