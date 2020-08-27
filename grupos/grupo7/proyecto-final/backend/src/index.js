import express from 'express';
import cors from 'cors';
import passport from 'passport';
import auth from './auth';
import session from 'express-session';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import {} from 'dotenv/config';

import { connect } from './connection';
import memesRoutes from './controllers/memes';
import userRoutes from './controllers/user';

const PORT = 8000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

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

app.post('/upload', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/upload/' + sampleFile.name, function (err) {
    if (err) return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

/* Realizo la conexión a la base de datos al momento de levantar la aplicacion*/
connect()
  .then((db) => (app.locals.db = db))
  .then((db) => auth(app, db));

app.listen(PORT);
console.log(
  `Servidor escuchando en http://localhost:${PORT} - Entorno ${process.env.ENVIRONMENT}`
);
