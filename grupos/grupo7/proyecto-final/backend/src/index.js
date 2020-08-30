import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import {} from 'dotenv/config';

import { connect } from './connection';
import memesRoutes from './controllers/memes';
import categoriasRoutes from './controllers/categorias';
import userRoutes from './controllers/user';

const PORT = 8000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

require('./auth/init')(app);

app.use('/memes', memesRoutes);
app.use('/categorias', categoriasRoutes);
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

/* Realizo la conexión a la base de datos al momento de levantar la aplicacion*/
connect().then((db) => (app.locals.db = db));

app.listen(PORT);
console.log(
  `Servidor escuchando en http://localhost:${PORT} - Entorno ${process.env.ENVIRONMENT}`
);
