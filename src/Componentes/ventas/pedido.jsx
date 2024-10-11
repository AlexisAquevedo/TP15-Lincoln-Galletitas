import React, { useState } from 'react';

const NuevoPedido = ({ clienteID, productoID, precio, setPedidoID }) => {
  const [formData, setFormData] = useState({
    CantidadVendida: '',
    Fecha: '',
    Estado: 'Pendiente'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:5000/Nueva-Venta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ClienteID: clienteID,
        ProductoID: productoID,
        CantidadVendida: formData.CantidadVendida,
        Fecha: formData.Fecha,
        Estado: formData.Estado
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la creación del pedido');
        }
        return response.json();
      })
      .then(data => {
        if (data.pedidoID) {
          alert('Pedido añadido exitosamente');
          setPedidoID(data.pedidoID); 
          setFormData({ CantidadVendida: '', Fecha: '', Estado: 'Pendiente' });
        } else {
          alert('No se pudo obtener el ID del pedido');
        }
      })
      .catch(error => {
        console.error('Error al añadir pedido:', error);
        alert('Hubo un error al añadir el pedido. Por favor, inténtalo de nuevo.');
      });
  };

  return (
    <>    
    <div style={{ margin: "2rem" }}>
      <form onSubmit={handleSubmit}>
        <div className="contenedor-npedidos">
          <p>Precio del Producto Seleccionado: ${precio}</p>
          <label>Cantidad Vendida:</label>
          <input type="number" name="CantidadVendida" value={formData.CantidadVendida} onChange={handleChange} required />
          <br />
          <label>Fecha:</label>
          <input type="date" name="Fecha" value={formData.Fecha} onChange={handleChange} required />
          <br />
        </div>
          <button className='boton-elegante' type="submit">Añadir Pedido</button>        
      </form>      
    </div>

    </>

  );
};

export default NuevoPedido;
