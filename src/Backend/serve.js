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


app.listen(5000, () => {
  console.log('backend iniciado en http://localhost:5000');
});
