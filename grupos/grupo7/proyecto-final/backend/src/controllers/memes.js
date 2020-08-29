import express from 'express';
import authenticationMiddleware from '../auth/middleware';
import fileUpload from 'express-fileupload';
import { helpers } from '../db_helpers.js';

const router = express.Router();
const coleccion = 'meme';
const dirUpload = './upload/';

const parseData = (body) => {
  const item = {
    titulo: body.titulo,
    imagen: body.imagen,
    categoria: body.categoria,
    usuario: body.usuario,
    fecha: new Date(),
    votos: [],
    cantVotosUp: 0,
    cantVotosDown: 0,
    cantComentarios: 0,
  };
  return item;
};

router.get('/', async function (req, res) {
  const db = req.app.locals.db;

  const condition = {};
  const proyection = { votos: 0 };
  const sorting = { fecha: -1 };
  let limit = 20;
  let skip = 0;

  if (process.env.PAGING_MEMES) {
    limit = +process.env.PAGING_MEMES;
  }

  if (req.query.categoria) {
    condition.categoria = req.query.categoria;
  }
  if (req.query.pagina) {
    skip = limit * req.query.pagina;
  }

  const memes = await helpers.getDataFilterByCondition(
    db,
    coleccion,
    condition,
    proyection,
    sorting,
    limit,
    skip
  );
  res.json(memes);
});

router.get('/:id', async function (req, res) {
  const db = req.app.locals.db;
  const meme = await helpers.getDataFilterById(db, coleccion, req.params.id);
  res.json(meme);
});

router.post('/', authenticationMiddleware(), async function (req, res) {
  // req.user.name - es el nombre del user logueado
  if (req.body.usuario == !req.user.name) {
    res.status(401).send('Usuario No Valido');
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('Falta el archivo');
  }

  const db = req.app.locals.db;
  const meme = await helpers.insertData(db, coleccion, parseData(req.body));
  const uploadFile = req.files.uploadFile;

  meme.imagen = `${dirUpload + meme._id}.${uploadFile.name.substring(
    uploadFile.name.lastIndexOf('.') + 1
  )}`;

  uploadFile.mv(meme.imagen, function (err) {
    if (err) return res.status(500).send(err);
  });

  await helpers.updateData(db, coleccion, meme._id, meme);

  res.json(meme);
});

export default router;
