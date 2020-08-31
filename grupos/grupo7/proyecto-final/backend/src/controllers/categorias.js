import express from 'express';
import passport from 'passport';
import { helpers } from '../db_helpers.js';

const router = express.Router();
const coleccion = 'categoria';

const parseData = (body) => {
  const item = {
    nombre: body.nombre,
    cantMemes: 0,
    fecha: new Date(),
  };
  return item;
};

/*Obtener todas las categorias*/
router.get('/', async function (req, res) {
  const db = req.app.locals.db;

  const sorting = { nombre: 1 };

  const categorias = await helpers.getDataFilterByCondition(
    db,
    coleccion,
    {},
    {},
    sorting
  );
  res.json(categorias);
});

/*Agregar una categoria*/

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),

  async function (req, res) {
    if (req.body.usuario !== req.user.username) {
      return res.status(401).send('Usuario No Valido');
    }

    const db = req.app.locals.db;

    const categoriasExistentes = await helpers.getDataFilterByCondition(
      db,
      coleccion,
      { nombre: req.body.nombre },
      { _id: 1 },
      {},
      1,
      0
    );

    if (categoriasExistentes.length > 0) {
      return res.status(400).send('Ya existe la categoria');
    }

    const categoria = await helpers.insertData(
      db,
      coleccion,
      parseData(req.body)
    );
    res.json(categoria);
  }
);

export default router;
