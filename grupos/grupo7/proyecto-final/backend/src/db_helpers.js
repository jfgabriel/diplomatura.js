import { ObjectId } from 'mongodb';
import { connect } from './connection';

async function getDataFilterById(db, col, id = 0) {
  let findObj = {};
  if (id) {
    findObj._id = new ObjectId(id);
  }
  try {
    const databasesList = await db.collection(col).find(findObj).toArray();
    return databasesList[0];
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

async function getDataFilterByCondition(
  db,
  col,
  condition = {},
  proyection = {},
  sorting = {},
  limit = 0,
  skip = 0
) {
  try {
    const databasesList = await db
      .collection(col)
      .find(condition)
      .project(proyection)
      .limit(limit)
      .skip(skip)
      .sort(sorting)
      .toArray();

    return databasesList;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

async function insertData(db, col, elem) {
  try {
    await db.collection(col).insertOne(elem);
    return elem;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

async function updateData(db, col, id, elem) {
  const _id = new ObjectId(id);
  try {
    await db.collection(col).updateOne({ _id }, { $set: elem });
    return elem;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

async function deleteData(db, col, id) {
  const _id = new ObjectId(id);
  try {
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
  getDataFilterById,
  getDataFilterByCondition,
  insertData,
  updateData,
  deleteData,
};
