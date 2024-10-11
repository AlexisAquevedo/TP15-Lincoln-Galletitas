import React, { useState, useEffect } from 'react';
import '../../css/Venta/tabla-producto.css';


const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  return (
<div>
  <h2 className='sub-tabla-producto'>Lista de Productos</h2>
  <table className='tabla-producto'>
    <thead>
      <tr>
        <th>ID</th>
        <th>Precio</th>
        <th>Paquete</th>
        <th>Cantidad Disponible</th>
      </tr>
    </thead>
    <tbody>
      {productos.map(producto => (
        <tr key={producto.ID}>
          <td>{producto.ID}</td>
          <td>{producto.Precio}</td>
          <td>{producto.Paquete}</td>
          <td>{producto.CantidadDisponible}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default ListaProductos;
