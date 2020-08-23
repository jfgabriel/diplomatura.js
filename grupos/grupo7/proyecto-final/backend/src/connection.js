import { MongoClient } from 'mongodb';

export async function connect() {
  const uri = process.env.DB_MONGO_CONN;
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();

    if (process.env.ENVIRONMENT === 'dev') {
      console.error('Conexión de DB en ' + process.env.DB_MONGO_CONN);
    }

    return db;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Not connected';
  }
}
