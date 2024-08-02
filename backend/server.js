const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

//Usando CORS para la correcta comunicacion entre el puerto
//3000 del frontend y 5000 del backend
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/HDA', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Esquema de servicios
const servicioSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
});

// Modelo de servicio
const Servicio = mongoose.model('Servicio', servicioSchema);

// Endpoint para obtener servicios
app.get('/api/servicios', async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});