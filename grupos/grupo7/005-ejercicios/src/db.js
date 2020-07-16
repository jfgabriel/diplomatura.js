import { MongoClient } from 'mongodb';
const uri = "mongodb+srv://admin:admin@cluster0.lskvx.gcp.mongodb.net/diplomatura?retryWrites=true&w=majority";

export async function getDataFromCollectionFilterId(collection, id = 0) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    let findVal = {};
    if( id > 0) {
        findVal = { id: +id };
    }

    try {
        await client.connect();
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

export async function getDataFromCollectionFilterName(collection, name = '') {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    let findVal = {};
    if( name !== '') {
        findVal = { nombre: new RegExp(name) };
    }

    try {
        await client.connect();
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

export async function insertData(collection, newItem) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        await client.db().collection(collection).insertOne(newItem);
        return newItem;
    } catch (e) {
        console.error(e);
        return e;
    } finally {
        await client.close();
    }
}

export async function updateData(collection, id, updatedItem) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        await client.db().collection(collection).updateOne(
            { "id": +id },
            { $set: updatedItem }
        );
        return updatedItem;
    } catch (e) {
        console.error(e);
        return e;
    } finally {
        await client.close();
    }
}

export async function deleteData(collection, id) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const deleteResult = await client.db().collection(collection).deleteOne({ "id": +id });
        if(deleteResult.deletedCount) {
            return {ok: true};
        }else{
            return {ok: false};
        }
    } catch (e) {
        console.error(e);
        return e;
    } finally {
        await client.close();
    }
}

