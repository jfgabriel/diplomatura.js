import express from 'express';
import bodyParser from 'body-parser';
import alumnosRoutes from './controllers/alumnos';
import profesoresRoutes from './controllers/profesores';
import calificacionesRoutes from './controllers/calificaciones';

const PORT = 8080;
const app = express();
app.use(bodyParser.json());

app.use('/alumnos', alumnosRoutes);
app.use('/profesores', profesoresRoutes);
app.use('/calificaciones', calificacionesRoutes);

app.get('/', function (req, res) {
  res.json({ mensaje: 'Bienvenido al servidor de la Universidad' });
});

app.listen(PORT);
console.log(`Express started on port ${PORT}`);
