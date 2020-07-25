import mongo from 'mongodb';

const dbClient = mongo.MongoClient;
const dbname = 'universidad';
const url = (process.env.BASEDATOS || 'mongodb://localhost:27017/') + dbname;
let _db;
let _conexion;

/**
 * Connects to the database specified in this file and assing the result to _db
 */
async function connectDB() {
  try {
    dbClient.connect(url, { useUnifiedTopology: true }, (err, database) => {
      if (err) {
        console.log(err);
        throw err;
      }
      _conexion = database;
      _db = _conexion.db(dbname);
      if (!_db) {
        console.log(err);
        throw err;
      }
    });
  } catch (err) {
    console.log(err);
  }
}

/**
 * Returns the database stored in _db
 */
const getDb = () => _db;

/**
 * Returns a collection from the database specified
 * @param {String} name The collection you want to use
 * @param {Object} database The database that has the collection
 */
const getCollection = (name) => (database) =>
  database.collection(name) ?? _db.collection(name);

//const closeDb=()=>_conexion.close();

export const db = {
  connectDB,
  getDb,
  getCollection,
};
