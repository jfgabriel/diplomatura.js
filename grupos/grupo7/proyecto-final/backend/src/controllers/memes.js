import express from 'express';
import { helpers } from '../db_helpers.js';

const router = express.Router();
const coleccion = 'memes';

const parseData = (body) => {
  const item = {
    titulo: body.titulo,
    imagen: body.imagen,
    categoria: body.categoria,
    usuario: body.usuario,
    //fecha: body.usuario,
  };
  return item;
};

router.get('/', async function (req, res) {
  let memes = '';
  const condition = {};
  const db = req.app.locals.db;

  if (req.query.categoria) {
    condition.categoria = req.query.categoria;
  }

  if (req.query.fecha) {
    condition.fecha = { $lte: ISODate('fecha') };
  }

  memes = await helpers.getDataFilterByCondition(
    db,
    'memes',
    condition,
    { titulo: 1, imagen: 1, votos: 0 },
    +process.env.PAGING_MEMES
  );
  res.json(memes);
});

/*
router.post('/', async function (req, res) {
    const alumno = await helpers.pushData(coleccion, parseData(req.body));
    res.json(alumno);
  });

router.get('/:id', async function (req, res) {
  const alumno = await helpers.getDataById(coleccion, req.params.id);
  res.json(alumno);
});
*/

export default router;
