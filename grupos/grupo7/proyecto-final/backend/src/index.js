import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import {} from 'dotenv/config';

import { connect } from './connection';
import memesRoutes from './controllers/memes';
import userRoutes from './controllers/user';

const PORT = 8000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

require('./auth/index').init(app);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/memes', memesRoutes);
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
