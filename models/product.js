const mongoose = require('mongoose');
const Review = require('./review');
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    price: {
        type: Number,
        min: 0,
    },
    desc: {
        type: String,
    },
    cloudinary_id:{
        type: String,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

const Product = mongoose.model('Product', productSchema);

module.exports= Product;    