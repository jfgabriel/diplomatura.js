import express from 'express';
import bodyParser from 'body-parser';
import alumnosRoutes from './controllers/alumnos';
import profesoresRoutes from './controllers/profesores';
import { AlumnoRepository } from './repository/alumnoRepository';

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

app.use('/alumnos', alumnosRoutes);
app.use('/profesores', profesoresRoutes);

app.get('/', function (req, res) {
  res.json({ mensaje: 'Bienvenido al servidor de la Universidad..' });
});

//app.listen(PORT);
//console.log(`Express started on port ${PORT}`);

app.listen(PORT, () => {
  console.log(`Express started on port ${PORT}`);
  //const a = new AlumnoRepository();
  //const result = a.getBy('nombre', 'roble');
  //console.log(result);
  //result.then((json) => console.log(json));
});
