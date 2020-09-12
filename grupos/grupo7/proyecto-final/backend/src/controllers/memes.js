import express from 'express';
import passport from 'passport';
import MemeModel from '../models/meme';
import ComentarioModel from '../models/comentario';
import CategoriaModel from '../models/categoria';

const router = express.Router();
const dirUpload = './upload/';

/*Obtener un paginado de los ultimos memes posteados, se puede filtar por categoria*/
router.get('/', async function (req, res) {
  try {
    const { categoria, pagina, usuario } = req.query;

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

    const memes = await MemeModel.aggregate([
      { $match: condition },
      {
        $project: {
          _id: 1,
          titulo: 1,
          imagen: 1,
          categoria: 1,
          usuario: 1,
          fecha: 1,
          cantVotosUp: 1,
          cantVotosDown: 1,
          cantComentarios: 1,
          votos: {
            $filter: {
              input: '$votos',
              as: 'voto',
              cond: {
                $eq: ['$$voto.usuario', usuario],
              },
            },
          },
        },
      },
      { $sort: { fecha: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    return res.json({ result: true, memes });
  } catch (error) {
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

    //incluir los comentarios al meme
    const comentarios = await ComentarioModel.find({ idMeme: id }, null, {
      sort: { fecha: 1 },
    });
    meme.comentarios = comentarios;
    return res.json({ result: true, meme });
  } catch (error) {
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
          function (error, result) {
            if (error) {
              return res.json({
                result: false,
                message: 'no se pudo guardar el meme',
                error,
              });
            }
          }
        );

        //actualizacion del contador de memes por categoria
        CategoriaModel.findByIdAndUpdate(
          cat._id,
          { $inc: { cantMemes: 1 } },
          function (error, result) {
            if (error) {
              return res.json({
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
      const { tipo, usuario } = req.body;
      const { id } = req.params;

      if (usuario !== req.user.username) {
        return res.json({ result: false, message: 'Usuario No Valido' });
      }

      //Verificar si el voto está bien definido
      if (tipo !== 'upvote' && tipo !== 'downvote') {
        return res.json({
          result: false,
          message: 'El tipo de voto no está correctamente definido',
        });
      }

      //Verificar que el usuario no haya votado este meme
      const meme = await MemeModel.findOne({
        $and: [{ _id: id }, { votos: { $elemMatch: { usuario } } }],
      });

      if (meme) {
        return res.json({
          result: false,
          message: 'El usuario ya voto sobre este meme',
        });
      }

      //agrego el voto
      const hora = new Date();
      const voto = {
        tipo,
        usuario,
        fecha: hora,
      };

      let exp;
      if (voto.tipo === 'upvote') {
        exp = {
          $push: { votos: voto },
          $inc: { cantVotosUp: 1 },
        };
      } else {
        exp = {
          $push: { votos: voto },
          $inc: { cantVotosDown: 1 },
        };
      }

      MemeModel.findByIdAndUpdate(id, exp, function (error, result) {
        if (error) {
          return res.json({
            result: false,
            message: 'fallo el registro del voto',
            error,
          });
        }
      });

      return res.json({ result: true, message: 'Voto registrado!', hora });
    } catch (error) {
      return res.json({
        result: false,
        message: 'no se pudo registrar el voto',
        error,
      });
    }
  }
);

/*Elimina un voto realidado a un meme, valida que efectivamente ese usuario votó el meme y actualiza los contadores*/

router.delete(
  '/:id/vote/:usuario',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    try {
      const { id, usuario } = req.params;

      if (usuario !== req.user.username) {
        return res.json({ result: false, message: 'Usuario No Valido' });
      }

      //Verificar que el usuario no haya votado este meme
      const meme = await MemeModel.findOne({
        $and: [{ _id: id }, { votos: { $elemMatch: { usuario } } }],
      });

      if (!meme) {
        return res.json({
          result: false,
          message: 'El usuario no voto ese meme',
        });
      }

      //busco el voto que hay que eliminar
      const voto = meme.votos.find((v) => v.usuario === usuario);

      //quito el voto de la coleccion
      let exp;
      if (voto.tipo === 'upvote') {
        exp = {
          $pull: { votos: { usuario: voto.usuario } },
          $inc: { cantVotosUp: -1 },
        };
      } else {
        exp = {
          $pull: { votos: { usuario: voto.usuario } },
          $inc: { cantVotosDown: -1 },
        };
      }

      MemeModel.findByIdAndUpdate(id, exp, function (error, result) {
        if (error) {
          return res.json({
            result: false,
            message: 'fallo el registro del voto',
            error,
          });
        }
      });

      return res.json({ result: true, message: 'Voto Eliminado!' });
    } catch (error) {
      return res.json({ result: false, message: error });
    }
  }
);

/*Obtengo todos los comentarios de un meme*/
router.get('/:id/comments', async function (req, res) {
  try {
    const { id } = req.params;

    const comentarios = await ComentarioModel.find({ idMeme: id }, null, {
      sort: { fecha: 1 },
    });

    res.json({ result: true, comentarios });
  } catch (error) {
    return res.json({ result: false, message: error });
  }
});

/*Comentar un meme: se agrega un comentario al meme*/
router.post(
  '/:id/comments',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    try {
      const { descripcion, usuario } = req.body;
      const { id } = req.params;

      if (usuario !== req.user.username) {
        return res.json({ result: false, message: 'Usuario No Valido' });
      }

      //verificar que el meme exista
      const meme = await MemeModel.findById(id);
      if (!meme) {
        return res.json({ result: false, message: 'No existe el meme' });
      }

      //Inserto el comentario
      const newComment = new ComentarioModel({
        idMeme: id,
        descripcion,
        usuario,
        fecha: new Date(),
      });

      //almacenar el nuevo comentario
      newComment.save(function (error, comentario) {
        if (error) {
          return res.json({
            result: false,
            message: 'no se pudo guardar el comentario',
            error,
          });
        }

        //actualizacion del contador de comentarios
        MemeModel.findByIdAndUpdate(
          id,
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

        return res.json({ result: true, comentario });
      });
    } catch (error) {
      return res.json({ result: false, message: error });
    }
  }
);

export default router;
