import express from 'express'; //Trae o requiere el modulo express
const app = express(); //contiene el objeto express, este objeto contien los metodos.
import postsRoutes from './controllers/posts';
import albumRoutes from './controllers/albums';
import usersRoutes from './controllers/users';
import os from 'os';
import moment from 'moment'; // modulo externo moment() para trabajar con fechas ne Js

const PORT = 8080; // puerto donde escucha
moment.locale('es-AR');
// Guardo el momento de inicio
const FORMATO_FIJO = 'MMMM Do YYYY, hh:mm:ss a'; // deje fijo el formato
app.use('/posts', postsRoutes); // Le cargo una ruta distinta en este caso la de posts
app.use('/albums', albumRoutes);
app.use('/users', usersRoutes);

// Implementar el endpoint de stats aca. GET "/"
app.get('/', function (req, res) {
  res.json({
    serverCurrentTime: moment().format(FORMATO_FIJO),
    serverStartUpTime: fechaInicio,
    serverUpTime: moment(fechaInicio, FORMATO_FIJO).fromNow(), // usando moment relative time: hace cuánto inició
    // serverUpTime: moment().startOf('hour').fromNow(),
    status: {
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      uptime: os.uptime(),
      hostname: os.hostname(),
      platform: os.platform(),
    },
  });
});
app.listen(PORT, () => console.log(`Express started on port ${PORT}`));
const fechaInicio = moment().format(FORMATO_FIJO); //para poder saber cuando inicio el servidor
