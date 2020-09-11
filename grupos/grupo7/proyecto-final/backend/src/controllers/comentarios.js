import express from 'express';
import passport from 'passport';
import { helpers } from '../db_helpers';
import { auxiliaries } from '../auxiliaries';

const router = express.Router();

/*Obtener un comentario*/
router.get('/:id', async function (req, res) {
  try {
    const db = req.app.locals.db;
    const comentario = await helpers.getDataFilterById(
      db,
      auxiliaries.coleccionCom,
      req.params.id
    );
    res.json(comentario);
  } catch (error) {
    return res.json({ result: false, message: error });
  }
});

/*Dar una Respuesta a un comentario*/
router.post(
  '/:id/replies',
  passport.authenticate('jwt', { session: false }),

  async function (req, res) {
    try {
      if (req.body.usuario != req.user.username) {
        return res.json({ result: false, message: 'Usuario No Valido' });
      }

      const db = req.app.locals.db;

      const comentario = await helpers.getDataFilterById(
        db,
        auxiliaries.coleccionCom,
        req.params.id
      );

      if (!comentario) {
        return res.json({ result: false, message: 'No existe el comentario' });
      }

      //agrego la respuesta
      const hora = new Date();
      const respuesta = auxiliaries.parseReply(req.body, hora);
      await helpers.updateDataExpresion(
        db,
        auxiliaries.coleccionCom,
        req.params.id,
        {
          $push: { respuestas: respuesta },
        }
      );

      //actualizacion del contador de comentarios (una respuesta es un comentario)
      await helpers.updateDataExpresion(
        db,
        auxiliaries.coleccionMeme,
        comentario.idMeme,
        {
          $inc: { cantComentarios: 1 },
        }
      );

      return res.json({
        result: true,
        message: 'La respuesta fue registrada',
        hora,
      });
    } catch (err) {
      console.log(error);
      return res.json({
        result: false,
        message: 'no fue posible registrar la respuesta',
        err,
      });
    }
  }
);

export default router;
