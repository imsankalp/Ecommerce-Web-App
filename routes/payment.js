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




// router.get('/user/:userId/cart/order/payment',isUserLoggedIn, async (req, res) => {

//   res.render('payments/paymentPage', );
// });

// router.post('/user/:userId/cart/order/payment',isUserLoggedIn, async (req, res) => {

//   const order = new Order ({
//       user: req.user._id,
//       address: req.body.address,
//       createdAt: new Date(),
//   })
//   await order.save();
//   const user = req.user;
//   // const order = await Order.findById(req.params.userId).populate('user');

//     let totalAmount = 0;
//     let productId = [];
    
  
//     for(products of user.cart){
//       // console.log(products);
//       const p = await Product.findById(products);
//       // console.log(p._id);
//       await productId.push(p._id);
//         totalAmount += p.price;
//     }
//     console.log("Order id is "+ order._id);
//     await Order.findByIdAndUpdate({_id: order._id}, {products: productId});
//     console.log(totalAmount);
//     await Order.findOneAndUpdate({_id: order._id} ,{amount: totalAmount});
    
//     res.render('payments/paymentPage',{Odata: {key: process.env.KEY_ID, userid: req.params.userId, order: order}} );
//   })

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

//Routes

router.post("/api/payment/order", (req, res) => {
  console.log(req.body);
  params = req.body;
  instance.orders
    .create(params)
    .then((data) => {
      res.send({ sub: data, status: "success" });
    })
    .catch((error) => {
      res.send({ sub: error, status: "failed" });
    });
});

router.post("/api/payment/verify", (req, res) => {
  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig" + req.body.razorpay_signature);
  console.log("sig" + expectedSignature);
  var response = { status: "failure" };
  if (expectedSignature === req.body.razorpay_signature)
    response = { status: "success" };
  res.send(response);
});

module.exports = router;