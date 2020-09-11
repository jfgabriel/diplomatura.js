import express from 'express';
import passport from 'passport';
import MemeModel from '../models/meme';
import ComentarioModel from '../models/comentario';
import CategoriaModel from '../models/categoria';
import { helpers } from '../db_helpers';
import { auxiliaries } from '../auxiliaries';
import { ObjectId } from 'mongodb';

const router = express.Router();
const dirUpload = './upload/';

/*Obtener un paginado de los ultimos memes posteados, se puede filtar por categoria*/
router.get('/', async function (req, res) {
  try {
    const { categoria, pagina } = req.query;

    const condition = {};
    let limit = 20;
    let skip = 0;

    if (process.env.PAGING_MEMES) {
      limit = +process.env.PAGING_MEMES;
    }
    if (categoria) {
      condition.categoria = categoria;
    }
    if (pagina) {
      skip = limit * (pagina - 1);
    }

    const memes = await MemeModel.find(
      condition,
      { votos: 0 },
      {
        sort: { fecha: -1 },
        limit,
        skip,
      }
    );

    return res.json({ result: true, memes });
  } catch (error) {
    console.log(error);
    return res.json({
      result: false,
      message: 'no se pude ejecutar la consulta',
      error,
    });
  }
});

/*Obtener un meme*/
router.get('/:id', async function (req, res) {
  try {
    const { id } = req.params;

    const meme = await MemeModel.findById(id);
    const comentarios = await ComentarioModel.find({ idMeme: id }, null, {
      sort: { fecha: 1 },
    });
    meme.comentarios = comentarios;

    return res.json({ result: true, meme });
  } catch (error) {
    console.log(error);
    return res.json({
      result: false,
      message: 'No se pudo obtener el meme',
      error,
    });
  }
});

/*Agregar un meme, incluye la lógica para hacer el upload del archivo*/
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    try {
      const { titulo, categoria, usuario } = req.body;

      if (usuario !== req.user.username) {
        return res.json({ result: false, message: 'Usuario No Valido' });
      }

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.json({ result: false, message: 'Falta el archivo' });
      }

      //validar que la categoria exista
      const cat = await CategoriaModel.findOne({ nombre: categoria });
      if (!cat) {
        return res.json({ result: false, message: 'La categoria no existe' });
      }

      const newMeme = new MemeModel({
        titulo,
        categoria,
        usuario,
        fecha: new Date(),
        cantVotosUp: 0,
        cantVotosDown: 0,
        cantComentarios: 0,
      });

      //almacenar el nuevo meme
      newMeme.save(function (error, meme) {
        if (error) {
          console.log(error);
          return res.json({
            result: false,
            message: 'no se pudo guardar el meme',
            error,
          });
        }

        //copiar la imagen al servidor
        const uploadFile = req.files.uploadFile;
        meme.imagen = `${dirUpload + meme._id}.${uploadFile.name.substring(
          uploadFile.name.lastIndexOf('.') + 1
        )}`;

        uploadFile.mv(meme.imagen, function (err) {
          if (err) return res.json({ result: false, message: err });
        });

        //actualizar el meme con el path de la imagen
        MemeModel.findByIdAndUpdate(
          meme._id,
          { imagen: meme.imagen },
          function (err, result) {
            if (error) {
              res.json({
                result: false,
                message: 'no se pudo guardar el meme',
                error,
              });
            }
          }
        );

        //actualizacion del contador de memes por categoria
        console.log(cat);
        CategoriaModel.findByIdAndUpdate(
          cat._id,
          { $inc: { cantMemes: 1 } },
          function (err, result) {
            if (error) {
              res.json({
                result: false,
                message: 'no se pudo guardar el meme',
                error,
              });
            }
          }
        );

        return res.json({ result: true, meme });
      });
    } catch (error) {
      return res.json({ result: false, message: error });
    }
  }
);

/*Votar un meme: se valida que el usuario no haya votado ya. Se actualizan los contadores*/
router.post(
  '/:id/vote',
  passport.authenticate('jwt', { session: false }),

  async function (req, res) {
    try {
      console.log(req.user.username);
      console.log(req.body.usuario);
      if (req.body.usuario != req.user.username) {
        return res.json({ result: false, message: 'Usuario No Valido' });
      }

      const db = req.app.locals.db;
      const voto = auxiliaries.parseVoto(req.body);
      const condition = {
        $and: [
          { _id: new ObjectId(req.params.id) },
          { votos: { $elemMatch: { usuario: req.body.usuario } } },
        ],
      };
      const proyection = { _id: 1 };

      if (voto.tipo === undefined) {
        return res.json({
          result: false,
          message: 'No se pudo registrar el voto',
        });
      }
      //Verificar que el usuario no haya votado este meme
      const memes = await helpers.getDataFilterByCondition(
        db,
        auxiliaries.coleccionMeme,
        condition,
        proyection,
        {},
        1,
        0
      );

      if (memes.length > 0) {
        return res.json({
          result: false,
          message: 'El usuario ya voto sobre este meme',
        });
      }

      //agrego el voto
      await helpers.updateDataExpresion(
        db,
        auxiliaries.coleccionMeme,
        req.params.id,
        {
          $push: { votos: voto },
        }
      );

      let exp;
      if (voto.tipo == 'upvote') {
        exp = { $inc: { cantVotosUp: 1 } };
      } else {
        exp = { $inc: { cantVotosDown: 1 } };
      }

      //actualizacion del contador de votos
      await helpers.updateDataExpresion(
        db,
        auxiliaries.coleccionMeme,
        req.params.id,
        exp
      );

      return res.json({ result: true, message: 'Voto registrado!' });
    } catch (error) {
      return res.json({ result: false, message: error });
    }
  }
);

/*Elimina un voto realidado a un meme, valida que efectivamente ese usuario votó el meme y actualiza los contadores*/

router.delete(
  '/:id/vote',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    try {
      if (req.body.usuario !== req.user.username) {
        return res.json({ result: false, message: 'Usuario No Valido' });
      }

      const db = req.app.locals.db;

      const condition = {
        $and: [
          { _id: new ObjectId(req.params.id) },
          { votos: { $elemMatch: { usuario: req.body.usuario } } },
        ],
      };
      const proyection = { _id: 1, votos: 1 };

      //Verificar que el usuario si haya votado este meme
      const memes = await helpers.getDataFilterByCondition(
        db,
        auxiliaries.coleccionMeme,
        condition,
        proyection,
        {},
        1,
        0
      );

      if (memes.length === 0) {
        return res.json({
          result: false,
          message: 'El usuario no voto ese meme',
        });
      }

      //busco el voto que hay que eliminar
      const voto = memes[0].votos.find((v) => v.usuario === req.body.usuario);

      //quito el voto de la coleccion
      await helpers.updateDataExpresion(
        db,
        auxiliaries.coleccionMeme,
        req.params.id,
        {
          $pull: { votos: { usuario: voto.usuario } },
        }
      );

      let exp;
      if (voto.tipo == 'upvote') {
        exp = { $inc: { cantVotosUp: -1 } };
      } else {
        exp = { $inc: { cantVotosDown: -1 } };
      }

      //actualizacion del contador de votos
      await helpers.updateDataExpresion(
        db,
        auxiliaries.coleccionMeme,
        req.params.id,
        exp
      );
      return res.json({ result: true, message: 'Voto Eliminado!' });
    } catch (error) {
      return res.json({ result: false, message: error });
    }
  }
);

/*Obtengo todos los comentarios de un meme*/
router.get('/:id/comments', async function (req, res) {
  try {
    const db = req.app.locals.db;
    const comentarios = await commentariosMeme(db, req.params.id);

    res.json({ result: true, comentarios });
  } catch (error) {
    return res.json({ result: false, message: error });
  }
});

/*Votar un meme: se valida que el usuario no haya votado ya. Se actualizan los contadores*/
router.post(
  '/:id/comments',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    try {
      if (req.body.usuario !== req.user.username) {
        return res.json({ result: false, message: 'Usuario No Valido' });
      }

      const db = req.app.locals.db;

      //verificar que el meme exista
      const meme = await helpers.getDataFilterById(
        db,
        auxiliaries.coleccionMeme,
        req.params.id
      );

      if (!meme) {
        return res.json({ result: false, message: 'No existe el meme' });
      }

      //Inserto el comentario
      const comentario = await helpers.insertData(
        db,
        auxiliaries.coleccionCom,
        auxiliaries.parseComment(req.body, req.params.id)
      );

      //actualizacion del contador de comentarios
      await helpers.updateDataExpresion(
        db,
        auxiliaries.coleccionMeme,
        req.params.id,
        {
          $inc: { cantComentarios: 1 },
        }
      );
      return res.json({ result: true, comentario });
    } catch (error) {
      return res.json({ result: false, message: error });
    }
  }
);

export default router;
