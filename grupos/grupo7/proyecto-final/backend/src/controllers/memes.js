import express from 'express';
import passport from 'passport';
import { helpers } from '../db_helpers.js';
import { ObjectId } from 'mongodb';

const router = express.Router();
const coleccion = 'meme';
const coleccionCom = 'comentario';
const coleccionCat = 'categoria';
const dirUpload = './upload/';

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

const parseVoto = (body) => {
  const item = {
    tipo:
      body.tipo === 'upvote' || body.tipo === 'downvote'
        ? body.tipo
        : undefined,
    usuario: body.usuario,
    fecha: new Date(),
  };
  return item;
};

const parseComment = (body, idmeme) => {
  const item = {
    idMeme: new ObjectId(idmeme),
    descripcion: body.descripcion,
    usuario: body.usuario,
    fecha: new Date(),
  };
  return item;
};

async function commentariosMeme(db, id) {
  const condition = { idMeme: new ObjectId(id) };
  const sorting = { fecha: 1 };

  const comentarios = await helpers.getDataFilterByCondition(
    db,
    coleccionCom,
    condition,
    {},
    sorting,
    0,
    0
  );

  async function getCategoriaByName(db, nombre) {
    const categorias = await helpers.getDataFilterByCondition(
      db,
      coleccion,
      { nombre: req.body.nombre },
      { _id: 1 },
      {},
      1,
      0
    );

    if (categorias.length > 0) {
      return undefined;
    }

    return categorias[0];
  }

  return comentarios;
}

/*Obtener un paginado de los ultimos memes posteados, se puede filtar por categoria*/
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
    skip = limit * (req.query.pagina - 1);
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

/*Obtener un meme*/
router.get('/:id', async function (req, res) {
  const db = req.app.locals.db;
  const meme = await helpers.getDataFilterById(db, coleccion, req.params.id);
  const comentarios = await commentariosMeme(db, req.params.id);
  meme.comentarios = comentarios;
  res.json(meme);
});

/*Agregar un meme, incluye la lógica para hacer el upload del archivo*/
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    if (req.body.usuario !== req.user.username) {
      return res.status(401).send('Usuario No Valido');
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Falta el archivo');
    }

    //validar que la categoria exista
    const categoria = await getCategoriaByName(helpers.body.categoria);
    if (!categoria) {
      return res.status(401).send('La categoria no existe');
    }

    const db = req.app.locals.db;
    const meme = await helpers.insertData(db, coleccion, parseData(req.body));
    const uploadFile = req.files.uploadFile;

    meme.imagen = `${dirUpload + meme._id}.${uploadFile.name.substring(
      uploadFile.name.lastIndexOf('.') + 1
    )}`;

    uploadFile.mv(meme.imagen, function (err) {
      if (err) return res.status(500).send(err);
    });

    await helpers.updateData(db, coleccion, meme._id, meme);

    //actualizacion del contador de memes por categoria
    await helpers.updateDataExpresion(db, coleccionCat, categoria._id, {
      $inc: { cantMemes: 1 },
    });

    res.json(meme);
  }
);

/*Votar un meme: se valida que el usuario no haya votado ya. Se actualizan los contadores*/
router.post(
  '/:id/vote',
  passport.authenticate('jwt', { session: false }),

  async function (req, res) {
    console.log(req.user.username);
    console.log(req.body.usuario);
    if (req.body.usuario != req.user.username) {
      return res.status(401).send('Usuario No Valido');
    }

    const db = req.app.locals.db;
    const voto = parseVoto(req.body);
    const condition = {
      $and: [
        { _id: new ObjectId(req.params.id) },
        { votos: { $elemMatch: { usuario: req.body.usuario } } },
      ],
    };
    const proyection = { _id: 1 };

    if (voto.tipo === undefined) {
      return res.status(400).send('No se pudo registrar el voto');
    }
    //Verificar que el usuario no haya votado este meme
    const memes = await helpers.getDataFilterByCondition(
      db,
      coleccion,
      condition,
      proyection,
      {},
      1,
      0
    );

    if (memes.length > 0) {
      return res.status(400).send('El usuario ya voto sobre este meme');
    }

    //agrego el voto
    await helpers.updateDataExpresion(db, coleccion, req.params.id, {
      $push: { votos: voto },
    });

    let exp;
    if (voto.tipo == 'upvote') {
      exp = { $inc: { cantVotosUp: 1 } };
    } else {
      exp = { $inc: { cantVotosDown: 1 } };
    }

    //actualizacion del contador de votos
    await helpers.updateDataExpresion(db, coleccion, req.params.id, exp);

    return res.json({ voto: 'ok' });
    //return res.status(200).send('Voto Registrado!');
  }
);

/*Elimina un voto realidado a un meme, valida que efectivamente ese usuario votó el meme y actualiza los contadores*/

router.delete(
  '/:id/vote',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    if (req.body.usuario !== req.user.username) {
      return res.status(401).send('Usuario No Valido');
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
      coleccion,
      condition,
      proyection,
      {},
      1,
      0
    );

    if (memes.length === 0) {
      return res.status(400).send('El usuario nunca voto ese meme');
    }

    //busco el voto que hay que eliminar
    const voto = memes[0].votos.find((v) => v.usuario === req.body.usuario);

    //quito el voto de la coleccion
    await helpers.updateDataExpresion(db, coleccion, req.params.id, {
      $pull: { votos: { usuario: voto.usuario } },
    });

    let exp;
    if (voto.tipo == 'upvote') {
      exp = { $inc: { cantVotosUp: -1 } };
    } else {
      exp = { $inc: { cantVotosDown: -1 } };
    }

    //actualizacion del contador de votos
    await helpers.updateDataExpresion(db, coleccion, req.params.id, exp);

    return res.status(200).send('Voto Eliminado!');
  }
);

/*Obtengo todos los comentarios de un meme*/
router.get('/:id/comments', async function (req, res) {
  const db = req.app.locals.db;
  const comentarios = await commentariosMeme(db, req.params.id);

  res.json(comentarios);
});

/*Votar un meme: se valida que el usuario no haya votado ya. Se actualizan los contadores*/
router.post(
  '/:id/comments',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    if (req.body.usuario !== req.user.username) {
      return res.status(401).send('Usuario No Valido');
    }

    const db = req.app.locals.db;

    //verificar que el meme exista
    const meme = helpers.getDataFilterById(db, coleccion, req.params.id);
    if (!meme) {
      return res.status(400).send('Meme inexistente');
    }

    //Inserto el comentario
    const comentario = await helpers.insertData(
      db,
      coleccionCom,
      parseComment(req.body, req.params.id)
    );

    //actualizacion del contador de comentarios
    await helpers.updateDataExpresion(db, coleccion, req.params.id, {
      $inc: { cantComentarios: 1 },
    });
    res.json(comentario);
  }
);

export default router;
