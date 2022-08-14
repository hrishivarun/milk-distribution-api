const { Schema , model} = require('mongoose');
const Order = model('Order', new Schema({
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'placed'
    },
    date: {
        type: Number,
        required: true,
        min: 1,
        max: 31
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        required: true,
        min: 1,
        max: 9999
    }
}));

module.exports = Order;