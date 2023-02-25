const express = require('express')

const router = express.Router()

const {Product} = require ("../models/product")



router.get('/', async (req, res) => {
    const productList = await Product.find();
  
    if (!productList) {
      res.status(500).json({ sucess: false });
    }
    res.send(productList);
  });
  
  router.post('/', async (req, res) => {
    try {
      const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
      });
  
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  module.exports = router