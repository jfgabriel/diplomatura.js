memes = {
  $schema: 'http://json-schema.org/draft-03/schema',
  bsonType: 'array',
  description: 'Colección de memes incluye los votos a los memes',
  items: {
    bsontype: 'object',
    properties: {
      _id: { bsonType: 'objectId' },
      titulo: { bsonType: 'string' },
      imagen: { bsonType: 'string' },
      categoria: { bsonType: 'string' },
      usuario: { bsonType: 'string' },
      fecha: { bsonType: 'date' },
      votos: {
        bsonType: 'array',
        description: 'Cada uno de los votos del meme',
        items: {
          bsonType: 'object',
          properties: {
            tipo: 'string',
            usuario: 'string',
            fecha: 'date',
          },
        },
      },
      cantVotosUp: { bsonType: 'number' },
      cantVotosDown: { bsonType: 'number' },
      cantComentarios: { bsonType: 'number' },
    },
  },
};

comentarios = {
  $schema: 'http://json-schema.org/draft-03/schema',
  bsonType: 'array',
  description: 'Colección de comentarios de memes y otros comentarios',
  items: {
    bsonType: 'object',
    properties: {
      _id: { bsonType: 'objectId' },
      idMeme: { bsonType: 'objectId' },
      idComentarioPadre: {
        bsonType: 'objectId',
        description:
          'Si el comentario es de un reply de otro, se asigna el id de dicho comentario, sino es undefinded',
      },
      descripcion: { bsonType: 'string' },
      usuario: { bsonType: 'string' },
      fecha: { bsonType: 'date' },
    },
  },
};

categorias = {
  $schema: 'http://json-schema.org/draft-03/schema',
  bsonType: 'array',
  description: 'Colección de las categorías de un meme',
  items: {
    bsonType: 'object',
    properties: {
      _id: { bsonType: 'objectId' },
      nombre: { bsonType: 'string' },
    },
  },
};

usuarios = {
  $schema: 'http://json-schema.org/draft-03/schema',
  bsonType: 'array',
  description: 'Colección de las categorías de un meme',
  items: {
    bsonType: 'object',
    properties: {
      _id: { bsonType: 'objectId' },
      email: { bsonType: 'string' },
      pass: { bsonType: 'string' },
      fechaAlta: { bsonType: 'date' },
      tokenVigente: { bsonType: 'string' },
    },
  },
};
