import express from 'express';
import authenticationMiddleware from '../auth/middleware';
import { helpers } from '../db_helpers.js';

const router = express.Router();
const coleccion = 'memes';

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
    'memes',
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
  const db = req.app.locals.db;
  const meme = await helpers.insertData(db, coleccion, parseData(req.body));
  res.json(meme);
});

export default router;
