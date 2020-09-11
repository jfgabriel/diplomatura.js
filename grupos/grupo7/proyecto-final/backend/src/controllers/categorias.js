import express from 'express';
import passport from 'passport';
import CategoriaModel from '../models/categoria';

const router = express.Router();

/*Obtener todas las categorias*/
router.get('/', async function (req, res) {
  try {
    const categorias = await CategoriaModel.find({}, null, {
      sort: { nombre: 1 },
    });

    return res.json({ result: true, categorias });
  } catch (error) {
    return res.json({
      result: false,
      message: 'Error al obtener las categorias',
      error,
    });
  }
});

/*Agregar una categoria*/
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),

  async function (req, res) {
    try {
      const { nombre, usuario } = req.body;

      if (usuario !== req.user.username) {
        return res.json({ result: false, message: 'Usuario No Valido' });
      }

      const categoriaExiste = await CategoriaModel.findOne({ nombre });

      if (categoriaExiste) {
        return res.json({ result: false, message: 'Ya existe la categoria' });
      }

      const categoria = CategoriaModel.create({
        nombre,
        cantMemes: 0,
      });

      return res.json({ result: true, nombre });
    } catch (error) {
      return res.json({
        result: false,
        message: 'Error al crear una categoria',
        error,
      });
    }
  }
);

export default router;
