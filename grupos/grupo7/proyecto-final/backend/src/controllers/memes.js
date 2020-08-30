import express from 'express';
import passport from 'passport';
import { helpers } from '../db_helpers.js';

const router = express.Router();
const coleccion = 'meme';

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

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    if (req.body.usuario === req.user.useername) {
      const db = req.app.locals.db;
      const meme = await helpers.insertData(db, coleccion, parseData(req.body));
      res.json(meme);
    } else {
      res.json({ err: 'Usuario No Valido' });
    }
  }
);

export default router;
