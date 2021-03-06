import mongoose from 'mongoose';

const ComentarioSchema = new mongoose.Schema({
  idMeme: mongoose.Schema.Types.ObjectId,
  descripcion: String,
  usuario: String,
  avatar: String,
  fecha: Date,
  respuestas: [
    {
      descripcion: String,
      usuario: String,
      avatar: String,
      fecha: Date,
    },
  ],
});

export default ComentarioSchema;
