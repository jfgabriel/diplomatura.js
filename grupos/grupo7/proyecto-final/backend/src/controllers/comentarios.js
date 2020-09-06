import express from 'express';
import passport from 'passport';
import { helpers } from '../db_helpers.js';
import { ObjectId } from 'mongodb';

const router = express.Router();
const coleccion = 'comentario';
const coleccionMeme = 'meme';

const parseReply = (body) => {
  const item = {
    descripcion: body.descripcion,
    usuario: body.usuario,
    fecha: new Date(),
  };
  return item;
};

/*Obtener un comentario*/
router.get('/:id', async function (req, res) {
  const db = req.app.locals.db;
  const comentario = await helpers.getDataFilterById(
    db,
    coleccion,
    req.params.id
  );
  res.json(comentario);
});

/*Dar una Respuesta a un comentario*/
router.post(
  '/:id/replies',
  passport.authenticate('jwt', { session: false }),

  async function (req, res) {
    console.log(req.user.username);
    console.log(req.body.usuario);
    if (req.body.usuario != req.user.username) {
      return res.status(401).send('Usuario No Valido');
    }

    //agrego la respuesta
    const db = req.app.locals.db;
    const respuesta = parseReply(req.body);
    await helpers.updateDataExpresion(db, coleccion, req.params.id, {
      $push: { respuestas: respuesta },
    });

    //actualizacion del contador de comentarios (una respuesta es un comentario)
    const comentario = await helpers.getDataFilterById(
      db,
      coleccion,
      req.params.id
    );
    await helpers.updateDataExpresion(db, coleccionMeme, comentario.idMeme, {
      $inc: { cantComentarios: 1 },
    });

    return res.json({ result: true, message: 'La respuesta fue registrada' });
  }
);

export default router;
