import { connect } from './connection';

export async function getDataFromCollectionFilterId(collection, id = 0) {
  let findVal = {};
  if (id > 0) {
    findVal.id = +id;
  }

  try {
    const db = await connect();
    const databasesList = db.collection(collection).find(findVal).toArray();
    return databasesList;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

export async function getDataFromCollectionFilterName(collection, name = '') {
  let findVal = {};
  if (name !== '') {
    findVal = { nombre: new RegExp(name) };
  }

  try {
    const db = await connect();
    const databasesList = await db
      .collection(collection)
      .find(findVal)
      .toArray();
    return databasesList;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

export async function insertData(collection, newItem) {
  try {
    const db = await connect();
    await client.db().collection(collection).insertOne(newItem);
    return newItem;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

export async function updateData(collection, id, updatedItem) {
  try {
    const db = await connect();
    await db
      .collection(collection)
      .updateOne({ id: +id }, { $set: updatedItem });
    return updatedItem;
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}

export async function deleteData(collection, id) {
  try {
    const db = await connect();
    const deleteResult = await db.collection(collection).deleteOne({ id: +id });
    return { ok: deleteResult.deletedCount };
  } catch (err) {
    if (process.env.ENVIRONMENT === 'dev') {
      console.error(err);
    }
    return 'Hubo un error en el pedido a la base de datos';
  }
}
