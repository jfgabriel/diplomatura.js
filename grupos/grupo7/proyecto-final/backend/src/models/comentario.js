import mongoose from 'mongoose';
import ComentarioSchema from '../schemas/comentario';

const ComentarioModel = mongoose.model(
  'comentario',
  ComentarioSchema,
  'comentario'
);

export default ComentarioModel;
