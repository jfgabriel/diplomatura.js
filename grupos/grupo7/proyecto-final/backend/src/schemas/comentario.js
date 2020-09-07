import mongoose from 'mongoose';

const ComentarioSchema = new mongoose.Schema({
  idMeme: ObjectId,
  descripcion: String,
  usuario: String,
  fecha: Date,
  respuestas: [
    {
      descripcion: String,
      usuario: String,
      fecha: Date,
    },
  ],
});

export default ComentarioSchema;
