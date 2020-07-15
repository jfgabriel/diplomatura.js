import { MongoClient } from 'mongodb';

export async function getDataFromCollection(collection, id = 0){
    const uri = "mongodb+srv://admin:admin@cluster0.lskvx.gcp.mongodb.net/diplomatura?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    let findVal = {};
    if( id > 0) {
        findVal = { id: +id };
    }
 
    try {
        await client.connect();
        // const databasesList = await client.db().collection('calificaciones').find({});
        // const databasesList = await client.db().collection('materias').find({});
        // const databasesList = await client.db().collection('profesores').find({});
        // const databasesList = await client.db().collection('provincias').find({});
        // const databasesList = await client.db().collection('universidades').find({});
        const databasesList = await client.db().collection(collection).find(findVal);
        const res = await databasesList.toArray();
        return res;
    } catch (e) {
        console.error(e);
        return e;
    } finally {
        await client.close();
    }
}
