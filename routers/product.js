const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const { Product } = require('../models/product');
const { Category } = require('../models/category');

router.get('/', async (req, res) => {
    let filter = {};

    if (req.query.categories) {
        const filter = { category: req.query.categories.split(',') };
    }
    const productList = await Product.find(filter).populate('category');

    if (!productList) {
        res.status(500).json({ sucess: false });
    }
    res.send(productList);
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
        res.status(500).json({ sucess: false });
    }
    res.send(product);
});

router.post('/', async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product ID');
    }
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true } // for returning data after update
    );
    if (!product) return res.status(400).send('the product cannot be created');

    res.send(product);
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        if (product) {
            return res.status(200).json({
                success: true,
                message: 'The product successfully deleted',
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'The product could not be found',
            });
        }
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
});

router.get(`/get/count`, async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.send({
            success: true,
            productCount: productCount,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get(`/get/featured/:count`, async (req, res) => {
    try {
        const count = req.params.count ? req.params.count : 0;
        const products = await Product.find({ isFeatured: true }).limit(+count);
        res.send({
            success: true,
            products: products,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
