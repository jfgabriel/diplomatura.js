import express from 'express';
import passport from 'passport';
import { helpers } from '../db_helpers';
import { auxiliaries } from '../auxiliaries';

const router = express.Router();

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
  try {
    const db = req.app.locals.db;

    const sorting = { nombre: 1 };

    const categorias = await helpers.getDataFilterByCondition(
      db,
      auxiliaries.coleccionCat,
      {},
      {},
      sorting
    );
    return res.json({ result: true, categorias });
  } catch (error) {
    return res.json({ result: false, message: error });
  }
});

/*Agregar una categoria*/

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),

  async function (req, res) {
    try {
      if (req.body.usuario !== req.user.username) {
        return res.json({ result: false, message: 'Usuario No Valido' });
      }

      const db = req.app.locals.db;

      const categoriasExistentes = await helpers.getDataFilterByCondition(
        db,
        auxiliaries.coleccionCat,
        { nombre: req.body.nombre },
        { _id: 1 },
        {},
        1,
        0
      );

      if (categoriasExistentes.length > 0) {
        return res.json({ result: false, message: 'Ya existe la categoria' });
      }

      const categoria = await helpers.insertData(
        db,
        auxiliaries.coleccionCat,
        parseData(req.body)
      );
      return res.json({ result: true, categoria });
    } catch (error) {
      return res.json({ result: false, message: error });
    }
  }
);

export default router;
