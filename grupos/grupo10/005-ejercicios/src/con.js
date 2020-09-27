import MongoClient from 'mongodb';

/* exporta cadena de conexion*/
export async function connect(){
    try{
        //La conexion es una peticion asyncrona
        const cliente=await MongoClient.connect("mongodb://localhost:27017",{
            //la consola dice que estan deprecados
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        const db=cliente.db("diplomatura");
        return db;
    }
    catch(e){
        console.log(e);

    }
  
}
