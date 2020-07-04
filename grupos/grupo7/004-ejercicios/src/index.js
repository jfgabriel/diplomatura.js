import express from 'express';
import moment from 'moment';
import os from 'os';

const serverStart = new Date();
const app = express();
import postsRoutes from './controllers/posts';
import albumRoutes from './controllers/albums';

const PORT = 8080;

app.use('/posts', postsRoutes);
app.use('/albums', albumRoutes);

moment.locale('es-AR');

// Implementar el endpoint de stats aca. GET "/"
app.get('/', function (req, res) {
  const stats = {
    serverCurrentTime : moment().format('MMMM Do YYYY, h:mm:ss a'),
    serverStartTime : moment(serverStart).format('MMMM Do YYYY, h:mm:ss a'),
    serverUpTime : 'hace ' +  moment().diff(serverStart, 'minutes') + ' minutos',
    status : {
      freemem : os.freemem(),
      totalmem : os.totalmem(),
      uptime : os.uptime(),
      hostname : os.hostname(),
      platform : os.platform()
    }
  };
  res.json(stats);
});

app.listen(PORT, ()=> {console.log(`Express started on port ${PORT}`);});

