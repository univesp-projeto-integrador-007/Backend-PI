const mongoose = require('mongoose');

const { Schema } = mongoose;


const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    oldPrice:{
        type: Number,
        required: false,
    },
    image: {
        type: String,
        required: true,
    },
    isEmphasis:{
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true});

const Product = mongoose.model('Product', productSchema)

module.exports = {
    Product, 
    productSchema
}