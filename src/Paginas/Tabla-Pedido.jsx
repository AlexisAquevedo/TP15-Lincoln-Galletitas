import React, { useState, useEffect } from 'react';

function TablaPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://localhost:5000/tabla-pedidos'); 
        if (!response.ok) {
          throw new Error('Error al obtener los pedidos');
        }
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <table border="1" style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Empleado</th>
            <th>Cantidad Vendida</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Punto de Control</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <tr key={pedido.ID}>
                <td>{pedido.ID}</td>
                <td>{pedido.Empleado}</td>
                <td>{pedido.CantidadVendida}</td>
                <td>{new Date(pedido.Fecha).toLocaleDateString()}</td>
                <td>{pedido.Estado}</td>
                <td>{pedido.PuntoDeControl}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay pedidos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaPedidos;
