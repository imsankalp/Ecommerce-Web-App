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
        await user.save();
        req.flash('success', 'Added to cart successfully')
        res.redirect(`/user/${req.user._id}/cart`);
    }
    catch(e) {
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




module.exports = router;