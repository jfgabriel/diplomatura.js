import express from 'express';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import {} from 'dotenv/config';
import fs from 'fs';

import { connect } from './connection';
import memesRoutes from './controllers/memes';
import categoriasRoutes from './controllers/categorias';
import comentariosRoutes from './controllers/comentarios';
import userRoutes from './controllers/user';

const PORT = 8000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

require('./auth/index').init();

app.use(passport.initialize());

app.use('/memes', memesRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/user', userRoutes);

const home = `
<h1>API endpoints</h1>
<p>Memes: <a href="/memes">/memes</a></p>
`;

app.get('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(home);
  res.end();
});

// Show Image

app.get('/show-image/', function (req, res) {
  try {
    let img = fs.readFileSync(req.query.file);
    res.end(img, 'binary');
  } catch (err) {
    res.status(404).send(err);
  }
});

/* Realizo la conexión a la base de datos al momento de levantar la aplicacion*/
connect();

app.listen(PORT);
console.log(
  `Servidor escuchando en http://localhost:${PORT} - Entorno ${process.env.ENVIRONMENT}`
);
