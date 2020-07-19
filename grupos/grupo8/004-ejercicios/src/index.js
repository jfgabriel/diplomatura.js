import express from 'express';
import moment from 'moment';
import postsRoutes from './controllers/posts';
import albumRoutes from './controllers/albums';
import userRoutes from './controllers/userInfo';
const app = express();
const m = moment();
const os = require('os');
m.locale('es-AR'); //Setea el calendario a español y horario Argentino

const PORT = 8080;

app.use('/posts', postsRoutes);
app.use('/albums', albumRoutes);
app.use('/userInfo', userRoutes);

//Implementar el endpoint de stats aca. GET "/"
app.get('/', function (req, res) {
  const result = {
      serverCurrentTime: new Date(), //Crea la fecha actual
      serverStartUpTime: m.format('MMMM Do YYYY, h:mm:ss a'), //Formatea la fecha y hora de la manera enviada por parametro
      serverUpTime: m.startOf('minute').fromNow(), //Obtiene el tiempo en minutos desde el momento que se ejecuto el moment
      status: {
        freemem: os.freemem(), //Devuelva la cantidad de memoria libre en el sistema en formato bytes
        totalmem: os.totalmem(), //Devuelve la cantidad total de memoria del sistema en bytes
        uptime: os.uptime(), //Devuelve el tiempo de actividad del sistema en segundos
        hostname: os.hostname(), //Devuelve el nombre del equipo del sistema operativo como una cadena.
        platform: os.platform(), //Devuelve una cadena que identifica la plataforma del sistema operativo
      },
    };
    res.json(result);
});




app.listen(PORT);
console.log(`Express started on port ${PORT}`);
