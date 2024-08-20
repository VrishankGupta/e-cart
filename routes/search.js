const express = require('express');
const MongoClient = require('mongodb').MongoClient; // MongoDB driver
require("dotenv").config();
const router = express.Router();

const uri = process.env.MDB_CONNECT; // Replace with your MongoDB connection string

MongoClient.connect(uri, (err, client) => {
    if (err) {
        console.error(err);
        return;
    }
    
    const db = client.db('test'); // Replace with your database name
    const productsCollection = db.collection('products'); // Replace with your collection name
    const categoriesCollection = db.collection('categories'); // Replace with your categories collection name

    router.post('/search', async (req, res) => {
        const searchQuery = req.body.searchQuery;

        try {
            const results = await productsCollection.find({
                $or: [
                    { "name": { $regex: searchQuery, $options: 'i' } },  // Case-insensitive search
                    { "desc": { $regex: searchQuery, $options: 'i' } }  // Case-insensitive search
                ]
            }).toArray();

            const categories = await categoriesCollection.find({}).toArray();

            res.render('partials/search', { results: results, searchQuery: searchQuery, categories: categories });  // Render search.ejs with results and categories
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching search results');
        }
    });
});

module.exports = router; // Export the router for use in app.js
