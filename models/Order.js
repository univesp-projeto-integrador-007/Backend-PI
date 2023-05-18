const mongoose = require('mongoose');


const { Schema } = mongoose
// Definição do schema
const { productSchema } = require('./Product')

const orderSchema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  value: { type: Number, required: true },
  products: {
    type: [productSchema],
  },
}, 
{ timestamps: true }
);

// Criação do modelo
const Order = mongoose.model('Order', orderSchema);

module.exports = Order