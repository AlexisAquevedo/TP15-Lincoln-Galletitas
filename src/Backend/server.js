const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "030602",
  database: "Galletitas",
});



db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Conectado a la base de datos");
});


app.post('/Nuevo-Cliente', (req, res) => {
  const { NombreCompleto, Direccion, Telefono, Correo } = req.body;
  const sql = 'INSERT INTO Cliente (NombreCompleto, Direccion, Telefono, Correo) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [NombreCompleto, Direccion, Telefono, Correo], (err, result) => {
    if (err) {
      res.status(500).send('Error al añadir cliente');
    } else {
      res.json({ clienteID: result.insertId });
    }
  });
});


app.get('/productos', (req, res) => {
  const sql = 'SELECT * FROM Producto';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener productos');
    } else {
      res.json(results);
    }
  });
});


app.post('/Nueva-Venta', (req, res) => {
  const { ClienteID, ProductoID, CantidadVendida, Fecha, Estado } = req.body;
  const sql = 'INSERT INTO Pedido (ClienteID, ProductoID, CantidadVendida, Fecha, Estado) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [ClienteID, ProductoID, CantidadVendida, Fecha, Estado], (err, result) => {
    if (err) {
      res.status(500).send('Error al añadir pedido');
    } else {
      res.send({ message: 'Pedido añadido exitosamente', pedidoID: result.insertId });
    }
  });
});


// Ruta para obtener conductores
app.get('/api/conductores', (req, res) => {
  const sql = 'SELECT ID, NombreCompleto, Telefono FROM Empleado WHERE Rol = "Conductor"';
  
  db.query(sql, (error, results) => {
      if (error) {
          console.error("Error en la consulta:", error);
          return res.status(500).json({ error: error.message });
      }
      res.json(results);
  });
});




// Ruta para asignar un conductor a un pedido
app.post('/api/asignarConductor', (req, res) => {
  const { pedidoID, conductorID } = req.body;

  // Insertar en la tabla Calificacion
  const sql = 'INSERT INTO Calificacion (EmpleadoID, PedidoID) VALUES (?, ?)';

  db.query(sql, [conductorID, pedidoID], (error, results) => {
      if (error) {
          return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ message: 'Conductor asignado exitosamente.' });
  });
});



// Ruta para asignar un punto de control a un conductor
app.post('/api/asignarPuntoDeControl', (req, res) => {
  const { conductorID, puntoDeControlID } = req.body;

  // Insertar en la tabla PuntoDeControl
  const sql = 'UPDATE PuntoDeControl SET EmpleadoID = ? WHERE ID = ?';

  db.query(sql, [conductorID, puntoDeControlID], (error, results) => {
      if (error) {
          return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ message: 'Punto de control asignado exitosamente.' });
  });
});

// Ruta para obtener puntos de control
app.get('/api/puntosDeControl', (req, res) => {
  const sql = 'SELECT ID, Direccion FROM PuntoDeControl';
  
  db.query(sql, (error, results) => {
      if (error) {
          return res.status(500).json({ error: error.message });
      }
      res.json(results);
  });
});


// Endpoint para enviar la encuesta
app.post('/encuesta', (req, res) => {
  const { conductorId, sucursalId, respuestas, observaciones, estadoMercancia } = req.body;

  // Aquí debes agregar la lógica para insertar la encuesta en la base de datos.
  const encuestaQuery = `INSERT INTO Encuesta (ConductorID, SucursalID, Respuesta1, Respuesta2, Respuesta3, Observaciones, EstadoMercancia) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(encuestaQuery, [conductorId, sucursalId, ...respuestas, observaciones, estadoMercancia], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Error al enviar la encuesta' });
      }
      // Calcular el promedio de satisfacción
      const promedio = respuestas.reduce((a, b) => a + b, 0) / respuestas.length;
      res.json({ mensaje: 'Encuesta enviada exitosamente', promedio });
  });
});


app.get('/sinencuesta', (req, res) => {
  const query = `
      SELECT E.ID, E.NombreCompleto 
      FROM Empleado E
      INNER JOIN PuntoDeControl PDC ON E.ID = PDC.EmpleadoID
      LEFT JOIN Encuesta ENC ON PDC.ID = ENC.PuntoDeControlID
      WHERE E.Rol = 'Conductor' 
      AND ENC.ID IS NULL;
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error al ejecutar la consulta:', err); // Registro del error en la consola del servidor
          return res.status(500).json({ error: 'Error al obtener conductores' });
      }

      // Verificar si se obtuvieron resultados
      if (results.length === 0) {
          return res.status(404).json({ error: 'No se encontraron conductores sin encuesta' });
      }

      // Si hay conductores, devolver los resultados en formato JSON
      res.json(results);
  });
});


// Ruta para obtener el estado de las galletas
app.get('/api/estado', (req, res) => {
  const sql = `
SELECT 
  P.ID, 
  E.NombreCompleto AS Empleado, 
  P.CantidadVendida AS Cantidad, 
  P.Fecha, 
  P.Estado, 
  PC.Direccion AS PuntoDeControl 
FROM 
  Pedido P
JOIN 
  Encuesta EN ON P.ID = EN.PedidoID
JOIN 
  PuntoDeControl PC ON EN.PuntoDeControlID = PC.ID
JOIN 
  Empleado E ON PC.EmpleadoID = E.ID;
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el estado de las galletas' });
    }
    res.json(results);
  });
});




app.listen(5000, () => {
  console.log('backend iniciado en http://localhost:5000');
});
