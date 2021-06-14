const express = require('express');
const { isUserLoggedIn } = require('../middleware');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user');


//Display cart details
router.get('/user/:userId/cart',isUserLoggedIn,async (req, res) => {
    
    try {
        const user = await User.findById(req.params.userId).populate('cart');
        res.render('cart/showCart', { userCart: user.cart });
    }
    catch (e) {
        req.flash('error', 'Unable to Add this product');
        res.render('error');
    }
})


//Adding product to cart
router.post('/user/:id/cart',isUserLoggedIn, async(req, res) => {

    try{
        const product= await Product.findById(req.params.id);
        const user = req.user;
        user.cart.push(product);
        await User.findByIdAndUpdate(user._id, {$pull: {wishlist: req.params.id}});
        await user.save();
        req.flash('success', 'Added to cart successfully')
        res.redirect(`/user/${req.user._id}/cart`);
    }
    catch(e) {
        console.log(e);
        req.flash('error', 'Unable to get the cart at the moment');
        res.render('error');
    }
})

//Deleting products from cart
router.delete('/user/:userId/cart/:id', isUserLoggedIn, async(req, res) => {

    const {userId, id} = req.params;
    await User.findByIdAndUpdate(userId, {$pull: {cart: id}});
    res.redirect(`/user/${req.user._id}/cart`);

})


//******************************************************************************* */



//Display favourites details
router.get('/user/:userId/favourites',isUserLoggedIn,async (req, res) => {
    
    try {
        const user = await User.findById(req.params.userId).populate('wishlist');
        res.render('cart/showFavourites', { userFavourites: user.wishlist });
    }
    catch (e) {
        req.flash('error', 'Unable to Add this product');
        res.render('error');
    }
})


//Adding product to favourites
router.post('/user/:id/favourites',isUserLoggedIn, async(req, res) => {

    try{
        const product= await Product.findById(req.params.id);
        const user = req.user;
        user.wishlist.push(product);
        await user.save();
        req.flash('success', 'Added to cart successfully')
        res.redirect(`/user/${req.user._id}/favourites`);
    }
    catch(e) {
        req.flash('error', 'Unable to get the cart at the moment');
        res.render('error');
    }
})

//Deleting products from Favourites
router.delete('/user/:userId/favourites/:id', isUserLoggedIn, async(req, res) => {

    const {userId, id} = req.params;
    await User.findByIdAndUpdate(userId, {$pull: {wishlist: id}});
    res.redirect(`/user/${req.user._id}/favourites`);

})



module.exports = router;