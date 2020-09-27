import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  avatar: String,
});

export default UserSchema;
