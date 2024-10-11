import React, { useState, useEffect } from 'react';

import '../../css/Venta/listapedidos.css';
import ListaProductos from './listaProducto';

const SelectProducto = ({ setProductoID, setPrecio }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  const handleProductoChange = (e) => {
    const selectedProducto = productos.find(prod => prod.ID === parseInt(e.target.value));
    setProductoID(selectedProducto.ID);
    setPrecio(selectedProducto.Precio);  
  };

  return (
    <div className="listapedidos">
        <div className="select-pedido">
      <label>Seleccionar Producto:</label>
      <select onChange={handleProductoChange}>
        <option value="">Seleccione un producto</option>
        {productos.map(producto => (
          <option key={producto.ID} value={producto.ID}>
            {producto.Paquete} - ${producto.Precio}
          </option>
        ))}
      </select>
        </div>
        <div className="tabla-pedido">
      <ListaProductos></ListaProductos>
        </div>

    </div>
  );
};

export default SelectProducto;
