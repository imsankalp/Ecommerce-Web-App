const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const methodOverride = require('method-override');
const Review= require('../models/review');
const {isUserLoggedIn} = require('../middleware');

//Show all Products
router.get('/products', async (req, res) => {

    try{
        const products= await Product.find({});
        res.render('products/index', {products});
    }
    catch (e){
        console.log("Something went wrong");
        req.flash('error', 'Cannot find products');
        res.render('error');
    }
});

//Create a new product
router.get('/products/new',isUserLoggedIn,  (req, res) => {

    res.render('products/new');
})
router.post('/products',isUserLoggedIn, async(req, res) => {

    try{
        await Product.create(req.body.product);
        req.flash('success','Product created successfully!');
        res.redirect('/products');
    }
    catch(e) {
        console.log(e.message);
        req.flash('error', 'Cannot create new product! Something went wrong');
        res.render('error');
    }
});

//Show a particular product
router.get('/products/:id', async (req, res) => {

    try{
        const product = await Product.findById(req.params.id).populate('reviews');;
        res.render('products/show', {product});    
    }
    catch(e) {
        console.log(e.message);
        req.flash('error', 'Cannot find this Product');
        res.redirect('/error');
    }
})

//Get edit form
router.get('/products/:id/edit',isUserLoggedIn, async(req, res) => {

    try{
        const product = await Product.findById(req.params.id);
        res.render('products/edit', {product});
    }
    catch(e) {
        console.log(e.message);
        req.flash('error', 'Cannot Edit this Product');
        res.redirect('/error');
    }
})


//Update the product
router.patch('/products/:id', isUserLoggedIn, async(req, res) => {

    try{
        await Product.findByIdAndUpdate(req.params.id, req.body.product);
        req.flash('success', 'Updated Successfully!');
        res.redirect(`/products/${req.params.id}`) 
    }
    catch(e) {
        console.log(e.message);
        req.flash('error', 'Cannot update this Product');
        res.redirect('/error');
    }
})

//Delete a product
router.delete('/products/:id',isUserLoggedIn,  async(req, res) => {

    try{
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    }
    catch(e) {
        console.log(e.message);
        req.flash('error', 'Cannot delete this Product');
        res.redirect('/error');
    }
})

//Creating a new comment
router.post('/products/:id/review',isUserLoggedIn, async (req, res) => {

    try{
        const product = await (await Product.findById(req.params.id));
        const review = new Review({
            user: req.user.username,
            ...req.body
        });

        product.reviews.push(review);

        await review.save();
        await product.save();

        res.redirect(`/products/${req.params.id}`);
    }
    catch(e) {
        console.log(e.message);
        req.flash('error', 'Cannot add review to this Product');
        res.redirect('/error');
    }

})

router.get('/error', (req, res) => {
    res.status(404).render('error');
})

module.exports = router;