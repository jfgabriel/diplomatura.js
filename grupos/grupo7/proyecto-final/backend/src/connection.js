import mongoose from 'mongoose';

export async function connect() {
  const uri = process.env.DB_MONGO_CONN;
  try {
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (process.env.ENVIRONMENT === 'dev') {
      console.error('Conexión de DB ok');
    }

    return db;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Not connected';
  }
}
