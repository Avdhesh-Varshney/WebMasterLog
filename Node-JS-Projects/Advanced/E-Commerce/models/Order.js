const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderShipDate: {
        type: Date,
        default: null
    },
    shipAddress1: {
        type: String,
        required: true
    },
    shipAddress2: {
        type: String,
        required: true
    },
    shipToCity: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
