import mongoose from 'mongoose';
import UserSchema from '../schemas/usuario';

const UserModel = mongoose.model('usuario', UserSchema, 'usuario');

export default UserModel;
