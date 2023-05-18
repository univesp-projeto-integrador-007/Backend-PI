const mongoose = require('mongoose');


const { Schema } = mongoose
// Definição do schema

const authSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
}, 
{ timestamps: true }
);

// Criação do modelo
const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth

