import express from 'express';
import os from 'os';
import moment from 'moment';
import postsRoutes from './controllers/posts';
import albumRoutes from './controllers/albums';
import usersRoutes from './controllers/users';

const app = express();
const PORT = 8080;

app.use('/posts', postsRoutes);
app.use('/albums', albumRoutes);
app.use('/users', usersRoutes);

moment.locale('es-AR');
let serverStartUpTime = moment();

// Implementar el endpoint de stats aca. GET "/"
app.get('/', function (req, res) {
  res.json({
    serverCurrentTime: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'),
    serverStartUpTime: serverStartUpTime.format('MMMM Do YYYY, h:mm:ss a'),
    serverUpTime: serverStartUpTime.startOf('minutes').fromNow(),
    status: {
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      uptime: os.uptime(),
      hostname: os.hostname(),
      platform: os.platform(),
    },
  });
});

app.listen(PORT);
console.log(`Express started on port ${PORT}`);
