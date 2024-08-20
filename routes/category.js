// routes/category.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.render('products/categ', { categories });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new category
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const category = new Category({ name });
        await category.save();
        res.redirect('products/categ');
    } catch (err) {
        res.status(500).send(err.message);
    }
});


module.exports = router;
