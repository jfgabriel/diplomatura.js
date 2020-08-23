import express from 'express';
import bodyParser from 'body-parser';
import {} from 'dotenv/config';

import { connect } from './connection';
import memesRoutes from './controllers/memes';

const PORT = 8000;
const app = express();
app.use(bodyParser.json());

app.use('/memes', memesRoutes);

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
