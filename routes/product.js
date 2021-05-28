const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const methodOverride = require('method-override');
const Review= require('../models/review');

//Show Products
router.get('/products', async (req, res) => {

    const products= await Product.find({});
    res.render('products/index', {products});
})

//Create a new product
router.get('/products/new',  (req, res) => {

    res.render('products/new');
})
router.post('/products', async(req, res) => {

    await Product.create(req.body.product);
    res.redirect('/products');
})

//Show a particular product
router.get('/products/:id', async (req, res) => {

    const product = await Product.findById(req.params.id).populate('reviews');;
    res.render('products/show', {product});
})

//Get edit form
router.get('/products/:id/edit', async(req, res) => {

    const product = await Product.findById(req.params.id);
    res.render('products/edit', {product});
})
//Update the product
router.patch('/products/:id', async(req, res) => {

    await Product.findByIdAndUpdate(req.params.id, req.body.product);
    res.redirect('/products');
})

//Delete a product
router.delete('/products/:id', async(req, res) => {

    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
})

//Creating a new comment
router.post('/products/:id/review', async (req, res) => {

    const product = await (await Product.findById(req.params.id));
    const review = new Review(req.body);

    product.reviews.push(review);

    await review.save();
    await product.save();

    res.redirect(`/products/${req.params.id}`);

})

module.exports = router;