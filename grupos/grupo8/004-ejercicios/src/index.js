import express from 'express';
import moment from 'moment';
import postsRoutes from './controllers/posts';
import albumRoutes from './controllers/albums';
const app = express();
const m = moment();
const os = require('os');
m.locale('es-AR');

const PORT = 8080;

app.use('/posts', postsRoutes);
app.use('/albums', albumRoutes);

// Implementar el endpoint de stats aca. GET "/"
app.get('/', function (req, res) {
  const result = {
      serverCurrentTime: new Date(),
      serverStartUpTime: m.format('MMMM Do YYYY, h:mm:ss a'),
      serverUpTime: m.startOf('minute').fromNow(),
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