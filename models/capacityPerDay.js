const { Schema, model } = require('mongoose');
const Capacity = model('capacity', new Schema({
    quantity: {
        type: Number,
        required: true,
        default: 1000
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

module.exports = Capacity;