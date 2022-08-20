const express = require('express');
const Order = require('../models/order');

const route = express.Router();
route.use(express.json());
route.get('/orders', async (req, res) => {
    const orders = await Order.find({});
    res.status(200).json(orders);
});

route.get('/orders/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
});

module.exports = route;