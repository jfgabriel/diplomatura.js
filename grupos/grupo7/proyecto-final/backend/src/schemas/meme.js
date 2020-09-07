import mongoose from 'mongoose';

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
});

export default MemeSchema;
