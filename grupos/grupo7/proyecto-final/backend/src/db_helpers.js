import { ObjectId } from 'mongodb';
import { connect } from './connection';

async function getDataFilterById(db, col, id = 0) {
  let findObj = {};
  if (id) {
    findObj._id = new ObjectId(id);
  }

  try {
    const databasesList = db.collection(col).find(findObj).toArray();
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
  cond = {},
  proy = {},
  lim = 0
) {
  try {
    console.log(proy);
    const databasesList = db
      .collection(col)
      .find(cond, proy)
      .limit(lim)
      .toArray();
    return databasesList;
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
};
