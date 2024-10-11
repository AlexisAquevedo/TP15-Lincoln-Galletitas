import React, { useEffect, useState } from "react";
import NavBar from "../Componentes/navbar";
import "../css/estado.css";

function Estado() {
  const [estadoData, setEstadoData] = useState([]);

  useEffect(() => {
    const fetchEstado = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/estado");
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setEstadoData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEstado();
  }, []);

  return (
    <>
      <div>
        <NavBar />
        <h1 className="estado">Estado de las Galletas</h1>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Empleado</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Punto de control</th>
            </tr>
          </thead>
          <tbody>
            {estadoData.map((item) => (
              <tr key={item.ID}>
                <td data-label="ID">{item.ID}</td>
                <td data-label="Empleado">{item.Empleado}</td>
                <td data-label="Cantidad">{item.Cantidad}</td>
                <td data-label="Fecha">{item.Fecha}</td>
                <td data-label="Estado">{item.Estado}</td>
                <td data-label="Punto de control">{item.PuntoDeControl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Estado;
