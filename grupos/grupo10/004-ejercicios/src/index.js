import express from 'express';
// Moment
import moment from 'moment';
import 'moment/locale/es';
// OS
import os from 'os';
const app = express();
import postsRoutes from './controllers/posts';
import albumRoutes from './controllers/albums';
import userRoutes from './controllers/users';

const PORT = 8080;

app.use('/posts', postsRoutes);
app.use('/albums', albumRoutes);
app.use('/users', userRoutes);

const serverStart = moment().format('MMMM Do YYYY, h:mm:ss a'); // Momento que empieza a correr el servidor

app.get('/', function (req, res) {
  let currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  let serverUpTime = moment(serverStart, 'MMMM Do YYYY, h:mm:ss a').fromNow();
  const result = {
    serverCurrentTime: currentTime,
    serverStartUpTime: serverStart,
    serverUpTime: serverUpTime,

    status: {
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      uptime: os.uptime(),
      hostname: os.hostname(),
      platform: os.platform(),
    },
  };
  res.json(result);
});

app.listen(PORT);
console.log(`Express started on port ${PORT}`);
