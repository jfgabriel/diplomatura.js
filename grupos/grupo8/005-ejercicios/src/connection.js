
import { MongoClient } from 'mongodb';

export async function connect(url) {
    try {
        const url = 'mongodb://localhost:27017';
        const client = await MongoClient.connect(url);
        const db = client.db('diplomatura');
        console.log('Connected');
        return db;
    } catch (err) {
        console.log('Not Connected');
    }
    return null;
}


