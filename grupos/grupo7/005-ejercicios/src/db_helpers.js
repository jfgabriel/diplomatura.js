import { connect } from './connection';
import { ObjectId } from 'mongodb';

async function getDataFilterId(col, id = 0) {
  let findObj = {};
  if (id) {
    findObj._id = new ObjectId(id);
  }

  try {
    const db = await connect();
    const databasesList = db.collection(col).find(findObj).toArray();
    return databasesList;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

async function getDataFilterName(col, name = '') {
  let findObj = {};
  if (name !== '') {
    findObj.nombre = new RegExp(name);
  }

  try {
    const db = await connect();
    const databasesList = await db.collection(col).find(findObj).toArray();
    return databasesList;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

async function insertData(col, elem) {
  try {
    const db = await connect();
    await client.db().collection(col).insertOne(elem);
    return elem;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

async function updateData(col, id, elem) {
  const _id = new ObjectId(id);
  try {
    const db = await connect();
    await db.collection(col).updateOne({ _id }, { $set: elem });
    return elem;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

async function deleteData(col, id) {
  const _id = new ObjectId(id);
  try {
    const db = await connect();
    const deleteResult = await db.collection(col).deleteOne({ _id });
    return { ok: deleteResult.deletedCount };
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

export const helpers = {
  getDataFilterId,
  getDataFilterName,
  insertData,
  updateData,
  deleteData,
};
