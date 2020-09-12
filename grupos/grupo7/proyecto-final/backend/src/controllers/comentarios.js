import express from 'express';
import passport from 'passport';
import ComentarioModel from '../models/comentario';
import MemeModel from '../models/meme';

const router = express.Router();

/*Obtener un comentario*/
router.get('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const comentario = await ComentarioModel.findById(id);

    res.json({ result: true, comentario });
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
      const { id } = req.params;
      const { descripcion, usuario } = req.body;

      if (usuario !== req.user.username) {
        return res.json({ result: false, message: 'Usuario No Valido' });
      }

      const comentario = await ComentarioModel.findById(id);
      if (!comentario) {
        return res.json({ result: false, message: 'No existe el comentario' });
      }

      const hora = new Date();
      const respuesta = {
        descripcion,
        usuario,
        fecha: hora,
      };

      //agrego la respuesta
      ComentarioModel.findByIdAndUpdate(
        id,
        { $push: { respuestas: respuesta } },
        function (error, result) {
          if (error) {
            return res.json({
              result: false,
              message: 'fallo el registro de la respuesta',
              error,
            });
          }
        }
      );

      //actualizacion del contador de comentarios
      MemeModel.findByIdAndUpdate(
        comentario.idMeme,
        { $inc: { cantComentarios: 1 } },
        function (error, result) {
          if (error) {
            return res.json({
              result: false,
              message: 'No se pudo actualizar el contador de Comentarios',
              error,
            });
          }
        }
      );

      return res.json({
        result: true,
        message: 'La respuesta fue registrada',
        hora,
      });
    } catch (error) {
      return res.json({
        result: false,
        message: 'no se pudo registrar la respuesta',
        error,
      });
    }
  }
);

export default router;
