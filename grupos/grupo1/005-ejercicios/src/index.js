import express, { json } from 'express';
import bodyParser from 'body-parser';
import alumnosRoutes from './routes/alumnosRouter';
import profesoresRoutes from './routes/profesoresRouter';
import materiasRoutes from './routes/materiasRouter';
import calificacionesRoutes from './routes/calificacionesRouter';
import { db } from './models/db';

const PORT = process.env.PORT || 8080;
const app = express();

db.connectDB((err, database) => {
  if (err) console.log(err);
});

app.use(bodyParser.json());

app.use('/alumnos', alumnosRoutes);
app.use('/profesores', profesoresRoutes);
app.use('/materias', materiasRoutes);
app.use('/calificaciones', calificacionesRoutes);

console.log(app.get('env'));
// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err);
});

app.get('/', function (req, res) {
  res.json({ mensaje: 'Bienvenido al servidor de la Universidad' });
});

app.listen(PORT);
console.log(`Express started on port ${PORT}`);
