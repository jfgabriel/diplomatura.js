import mongoose from 'mongoose';
import CategoriaSchema from '../schemas/categoria';

const CategoriaModel = mongoose.model(
  'categoria',
  CategoriaSchema,
  'categoria'
);

export default CategoriaModel;
