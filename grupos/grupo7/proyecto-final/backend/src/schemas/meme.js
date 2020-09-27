import mongoose from 'mongoose';
import ComentarioSchema from '../schemas/comentario';

const MemeSchema = new mongoose.Schema({
  titulo: String,
  imagen: String,
  categoria: String,
  usuario: String,
  fecha: Date,
  votos: [
    {
      tipo: String,
      usuario: String,
      fecha: Date,
    },
  ],
  cantVotosUp: Number,
  cantVotosDown: Number,
  cantComentarios: Number,
  comentarios: {
    type: [ComentarioSchema],
  },
});

export default MemeSchema;
