const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB Atlas connection string
const uri = 'mongodb+srv://mersal:Kishorekumar@cluster0.ogdni4m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function connectToDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        return client.db('mersal'); // Specify the database name here
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1); // Exit the application if connection fails
    }
}

// Endpoint to handle user registration (POST method)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Connect to MongoDB Atlas database
        const db = await connectToDatabase();

        // Insert user registration data into 'users' collection
        const result = await db.collection('users').insertOne({ username, password });

        // Send a success response
        res.status(201).send('Registration successful');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to register');
    }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware for handling 404 errors
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
