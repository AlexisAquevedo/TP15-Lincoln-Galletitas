import React, { useState } from 'react';
import '../../css/Venta/nuevoCliente.css';

const NuevoCliente = ({setClienteID}) => {
  const [formData, setFormData] = useState({
    NombreCompleto: '',
    Direccion: '',
    Telefono: '',
    Correo: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/Nuevo-Cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();  // Procesa la respuesta como JSON
    })
    .then(data => {
      alert('Cliente añadido exitosamente');
      setClienteID(data.clienteID);  // Asegúrate de que setClienteID es pasado correctamente como prop
      setFormData({ NombreCompleto: '', Direccion: '', Telefono: '', Correo: '' });
    })
    .catch(error => {
      console.error('Error al añadir cliente:', error);
    });
  };

  return (
    
    <div>
      <form className='form-newCliente' onSubmit={handleSubmit}>
        <label>
          Nombre Completo:
          <input type="text" name="NombreCompleto" value={formData.NombreCompleto} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Dirección:
          <input type="text" name="Direccion" value={formData.Direccion} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Teléfono:
          <input type="number" name="Telefono" value={formData.Telefono} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Correo:
          <input type="email" name="Correo" value={formData.Correo} onChange={handleChange} required />
        </label>
        <br />
        <button className='boton-elegante' type="submit">Añadir Cliente</button>
      </form>
    </div>
  );
};

export default NuevoCliente;
