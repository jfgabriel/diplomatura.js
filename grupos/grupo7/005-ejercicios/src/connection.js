import { MongoClient } from 'mongodb';

export async function connect() {
  const uri = process.env.DB_MONGO_CONN;
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    return db;
  } catch (err) {
    return 'Not connected';
  }
}
