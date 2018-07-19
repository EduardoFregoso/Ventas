const mongoose = require('mongoose');

let productosSchema = new mongoose.Schema({
   
    descripcion: {
        type: String,
        required: true
    },

    precio: {
        type: String,
        required: true
    },


});

const productosModel = mongoose.model('ProductosSchema', productosSchema, 'productos');

module.exports = productosModel;