
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri =process.env.DB_URI ;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function createNewURL(){
    try {
        const database = client.db('web');
        const collection = database.collection('urlShortner');
        const newEntry = {
            
        };
    const result = await collection.insertOne(newEntry);
    console.log
    } catch (error) {
        console.error("Can't insert new record");
    }
}

async function findURL(url){

}

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    await createNewURL();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
