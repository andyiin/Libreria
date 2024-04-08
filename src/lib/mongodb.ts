import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("Por favor, añade tu URI de MongoDB a .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client = new MongoClient(uri, options);
let clientPromise = client.connect();

async function getDb() {
    const client = await clientPromise;
    return client.db("Libreria");
}

export { getDb as default, clientPromise };
