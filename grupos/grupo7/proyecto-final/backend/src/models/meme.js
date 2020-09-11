import mongoose from 'mongoose';
import MemeSchema from '../schemas/meme';

const MemeModel = mongoose.model('meme', MemeSchema, 'meme');

export default MemeModel;
