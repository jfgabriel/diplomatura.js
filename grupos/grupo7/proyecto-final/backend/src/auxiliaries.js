import { ObjectId } from 'mongodb';

const coleccionMeme = 'meme';
const coleccionCat = 'categoria';
const coleccionCom = 'comentario';
const coleccionUser = 'usuario';

const parseMeme = (body) => {
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
    respuestas: [],
  };
  return item;
};

const parseReply = (body) => {
  const item = {
    descripcion: body.descripcion,
    usuario: body.usuario,
    fecha: new Date(),
  };
  return item;
};

export const auxiliaries = {
  coleccionMeme,
  coleccionCat,
  coleccionCom,
  coleccionUser,
  parseMeme,
  parseVoto,
  parseComment,
  parseReply,
};
