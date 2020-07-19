import { MongoClient } from 'mongodb';

export async function connect() {
  try {
    const url = 'mongodb://localhost:27017';
    const client = await MongoClient.connect(url);
    const db = client.db('diplomatura');
    console.log('Connected');
    return db;
  } catch (err) {
    console.log('Not Connected');
  }
  return null;
}

export const helpers = {
  getCollection: async function (item) {
    try {
      const db = await connect();
      return await db.collection(item).find({}).toArray();
    } catch (error) {}
  },

  getCollectionId: async function (data, coleccion) {
    try {
      const db = await connect();
      if (coleccion === 'calificaciones') {
        return await db.collection(coleccion).find({ alumno: data }).toArray();
      } else {
        return await db.collection(coleccion).find({ id: data }).toArray();
      }
    } catch (error) {}
  },

  postCollection: async function (data, coleccion) {
    try {
      const db = await connect();
      const insert = await db.collection(coleccion).insertOne(data);
      return insert.ops;
    } catch (error) {}
  },

  putCollection: async function (idUpdate, data, coleccion) {
    try {
      const db = await connect();
      if (coleccion === 'calificaciones') {
        const update = await db
          .collection(coleccion)
          .findOneAndUpdate(
            { alumno: idUpdate },
            { $set: data },
            { returnOriginal: false }
          );
        return update.value;
      } else {
        const update = await db
          .collection(coleccion)
          .findOneAndUpdate(
            { id: idUpdate },
            { $set: data },
            { returnOriginal: false }
          );
        return update.value;
      }
    } catch (error) {}
  },

  deleteDocument: async function (idDelete, coleccion) {
    const db = await connect();
    if (coleccion === 'calificaciones') {
      return await db.collection(coleccion).deleteOne({ alumno: idDelete });
    } else {
      return await db.collection(coleccion).deleteOne({ id: idDelete });
    }
  },
};
