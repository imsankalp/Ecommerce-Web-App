const express = require('express');
const { isUserLoggedIn } = require('../middleware');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const Order = require('../models/order');
const User = require('../models/user');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Product = require('../models/product');
const mongoose = require('mongoose');

const razorPayInstance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});


// router.get('/user/:userId/cart/order',isUserLoggedIn, async (req, res) => {

//   res.render('payments/checkout' );
// });

router.post('/user/:userId/cart/order',isUserLoggedIn, async (req, res) => {

  const user = req.user;
  let totalAmount = 0;
  let productId = [];
  for(products of user.cart){
      // console.log(products);
      const p = await Product.findById(products);
      // console.log(p._id);
      await productId.push(p._id);
        totalAmount += p.price;
    }
  
  
    params = {
      amount: `${totalAmount * 100}`,
      currency: "INR",
      receipt: 'ekart',
      payment_capture: "1",
    }
    razorPayInstance.orders.create(params)
    .then(async (response) => {
      console.log(response);
      const order = new Order({

        user: req.user._id,
      address: req.body.address,
      createdAt: new Date(),
        orderId: response.id,
			receiptId: response.receipt,
			amount: response.amount,
			currency: response.currency,
			createdAt: response.created_at,
			status: response.status,
      })
      try {
        // Render Order Confirmation page if saved succesfully
        await order.save()
        await Order.findByIdAndUpdate({_id: order._id}, {products: productId});
        console.log(totalAmount);
        await Order.findOneAndUpdate({_id: order._id} ,{amount: totalAmount});
        
        console.log(order);
        res.render('payments/checkout', {order : order, userid: req.user._id});
      } catch (err) {
        // Throw err if failed to save
        if (err) throw err;
      }
    }).catch((err) => {
      // Throw err if failed to create order
      if (err) throw err;
    })
  })

  router.post('/user/:userId/cart/order/verify',isUserLoggedIn, async function(req, res, next) {
    body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    let crypto = require("crypto");
    let expectedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET)
                .update(body.toString())
                .digest('hex');
  
    // Compare the signatures
    if(expectedSignature === req.body.razorpay_signature) {
      // if same, then find the previosuly stored record using orderId,
      // and update paymentId and signature, and set status to paid.
      await Order.findOneAndUpdate(
        { orderId: req.body.razorpay_order_id },
        {
          paymentId: req.body.razorpay_payment_id,
          signature: req.body.razorpay_signature,
          status: "paid"
        },
        { new: true },
        function(err, doc) {
          // Throw er if failed to save
          if(err){
            throw err
          }
          // Render payment success page, if saved succeffully
          res.render('payments/success', {order: doc});
        }
      );
    } else {
      res.render('payments/fail', {
        title: "Payment verification failed",
      })
    }
  });  
  module.exports = router;