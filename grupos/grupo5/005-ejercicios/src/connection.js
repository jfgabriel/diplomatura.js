import MongoClient from 'mongodb';

//Lo exporto ya que se debe llamar cada vez que haga una consulta a la base
export async function connect() {
  try {
    //me conecto al localhost
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    }); //se espera hasta que se genere o no la conexion
    const db = client.db('diplomatura'); //me conecto la base diplomatura
    return db;
  } catch (e) {
    console.log(e);
  }
}

//useUnifiedTopology: true
//El motor actual de detección y supervisión del servidor está en desuso y se eliminará en una versión futura. Para usar el nuevo motor de Descubrimiento y monitoreo del servidor, pase la opción {useUnifiedTopology: true} al constructor MongoClient.
