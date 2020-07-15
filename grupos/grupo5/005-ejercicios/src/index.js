import express from 'express';
import bodyParser from 'body-parser';
import alumnosRoutes from './controllers/alumnos';

import {connect} from './connection';

const PORT = 8080;
const app = express();
app.use(bodyParser.json());

app.use('/alumnos', alumnosRoutes);

app.get('/', function (req, res) {
  res.json({ mensaje: 'Bienvenido al servidor de la Universidad' });
});

app.listen(PORT);
//connect(); //solo probamos que la conexion a la base funciona
console.log(`Express started on port ${PORT}`);
