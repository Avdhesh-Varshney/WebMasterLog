const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id:{type:Number},
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);