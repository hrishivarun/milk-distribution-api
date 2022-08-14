const express = require('express');
const Order = require('../models/order');

const route = express.Router();
route.use(express.json());
route.put('/updateStatus/:id', async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        order.status = req.body.status;
        const updatedOrder = await order.save();

        res.status(200).json({
            updatedOrder: updatedOrder,
            updatedStatus: req.body.status
        });
    }catch(err){
        res.status(500).json({
            err: 'Server failed to update the status of order.'
        });
    }

});

module.exports = route;