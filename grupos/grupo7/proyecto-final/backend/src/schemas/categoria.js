import mongoose from 'mongoose';

const CategoriaSchema = new mongoose.Schema({
  nombre: String,
  cantMemes: Number,
});

export default CategoriaSchema;
