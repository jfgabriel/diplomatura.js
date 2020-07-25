import { db } from './db';
/**
 * Devuelve un objeto filtrando post con los parámetros admitidos
 * @param {Array} validParams accepted params for validation
 * @param {Object} requestBody parameters sended by post
 */

const paramsBuilder = (validParams, requestBody) =>
  validParams.reduce((filteredObject, acceptedAttribute) => {
    if (Object.prototype.hasOwnProperty.call(requestBody, acceptedAttribute)) {
      filteredObject[acceptedAttribute] = requestBody[acceptedAttribute];
    }
    return filteredObject;
  }, {});

const getCollection = async (collectionName) => {
  const database = await db.getDb();
  return await db.getCollection(collectionName)(database);
};

const insertToDb = async (collectionName, params) => {
  const collection = await getCollection(collectionName);
  const result = await collection.insertOne(params);
  return result;
};

const find = async (collectionName, query) => {
  const collection = await getCollection(collectionName);
  const result = await collection.find(query).toArray();
  return result;
};

const findOne = async (collectionName, query) => {
  const collection = await getCollection(collectionName);
  const result = await collection.findOne(query);
  return result;
};

const update = async (collectionName, query, updateData, opts) => {
  const collection = await getCollection(collectionName);
  const result = await collection.findOneAndUpdate(
    query,
    { $set: updateData },
    opts
  );
  return result;
};

const destroy = async (collectionName, query) => {
  const collection = await getCollection(collectionName);
  const result = await collection.deleteOne(query);
  return result;
};

export const Helpers = {
  paramsBuilder,
  insertToDb,
  find,
  findOne,
  update,
  destroy,
};
