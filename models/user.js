const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Product = require('./product');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required : true,
        unique: true
    },
    name: {
        type: String,
        default: 'no name'
    },
    contactno: {
        type: Number,
        default: 0,
    },
    img: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        default:"NA"
    },
    dateOfBirth: {
        type: String,
    },
    cloudinary_id:{
        type: String,
        default: ""
    },
    cart: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    cartAmount: {
        type: Number,
        default: 0,
    }
})



userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;