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

export const helpers = {
  getDataFilterId,
};
