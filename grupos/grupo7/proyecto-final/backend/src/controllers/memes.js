import express from 'express';
//import fileUpload from 'express-fileupload';
import passport from 'passport';
import { helpers } from '../db_helpers.js';
import { ObjectId } from 'mongodb';

const router = express.Router();
const coleccion = 'meme';
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
    skip = limit * req.query.pagina;
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

    res.json(meme);
  }
);

/*Votar un meme: se valida que el usuario no haya votado ya. Se actualizan los contadores*/
router.post(
  '/:id/vote',
  passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    if (req.body.usuario !== req.user.username) {
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

    return res.status(200).send('Voto Registrado!');
  }
);

/*Elimina un voto realidado a un meme, valida que efectivamente ese usuario votó el meme y actualiza los contadores*/
/*
router.delete('/:id/vote', passport.authenticate('jwt', { session: false }), async function (
  req,
  res
) {
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

  if (memes.length == 0) {
    return res.status(400).send('El usuario nunca voto ese meme');
  }

  //busco el voto que hay que eliminar
  const voto = memes[0].votos.find((v)=> v.usuario === req.body.usuario);

  //quito el voto de la coleccion -- FALTA
  await helpers.updateDataExpresion(db, coleccion, req.params.id, {
    $push: { votos: voto },
  });

  let exp;
  if (voto.tipo == 'upvote') {
    exp = { $inc: { cantVotosUp: -1 } };
  } else {
    exp = { $inc: { cantVotosDown: -1 } };
  }

  //actualizacion del contador de votos
  await helpers.updateDataExpresion(db, coleccion, req.params.id, exp);

  return res.status(200).send('Voto Registrado!');
});
*/

export default router;
