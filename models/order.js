const mongoose = require('mongoose');
const product = require('./product');
const user = require('./user');
const orderSchema = new mongoose.Schema({

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    orderId: {
		type: String,
		required: true
	},
	receiptId: {
		type: String
	},
	paymentId: {
		type: String,
	},
	signature: {
		type: String,
	},
	amount: {
		type: Number
	},
	currency: {
		type: String
	},
	createdAt: {
		type: Date
	},
	status: {
		type: String
	}

})


const Order = mongoose.model('Order', orderSchema);

module.exports= Order;  