import { MongoClient } from 'mongodb';

/**
 * Conexión con el motor de base de datos
 * @param {string} url de conexion
 * @return {Promise<MongoClient>}
 */
export async function connect(url) {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Se estableció la conexion!!!!!');
    return client;
  } catch (error) {
    console.log('No se estableció la conexión');
  }
  return null;
}
