const express = require('express');
const path = require('path');
const shortid = require('shortid');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.DB_URI;

app.use(express.static('public'));
app.use(express.json());

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Connect to MongoDB and ensure the connection is established
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Failed to connect to MongoDB Atlas', error);
    }
}
const database = client.db('web');
const collection = database.collection('urlShortner');
// Insert a new URL entry
async function createNewURL(short, original) {
    try {

        const result = await collection.insertOne({ short: short, original, createdAt: new Date() });
        console.log('New URL inserted with ID:', result.insertedId);
    } catch (error) {
        console.error("Can't insert new record:", error);
    }
}

// Find URL entry by short key
async function findURL(short) {
    try {
        return await collection.findOne({ short });
    } catch (error) {
        console.error("Can't find URL record:", error);
    }
}

// Endpoint to shorten URL
app.post('/shorten', async (req, res) => {
    const { original } = req.body;
    const short = shortid.generate();
    await createNewURL(short, original);
    res.json({ shortUrl: `${short}` });
});

// Endpoint to redirect to original URL
app.get('/:short', async (req, res) => {
    const { short } = req.params;
    try {
        const url = await findURL(short);

        if (url) {
            res.redirect(url.original);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve static index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

async function prune() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);  // Subtract 7 days from the current date

    try {
        const result = await collection.deleteMany({ createdAt: { $lt: oneWeekAgo } });
        console.log(`Pruned ${result.deletedCount} documents older than 1 week`);
    } catch (error) {
        console.error('Error pruning documents:', error);
    }
}


//Danger too much
setInterval(prune, 1000000)


// Start the server and connect to MongoDB
app.listen(port, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${port}`);
});
