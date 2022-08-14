const express = require('express');
const Order = require('../models/order');
const Capacity = require('../models/capacityPerDay');

const route = express.Router();
route.use(express.json());
route.put('/update/:id', async (req, res) => {
    try{
        
        const order = await Order.findById(req.params.id);
        if(req.body.quantity){
            const capacityForDay = await Capacity.findOne({
                date: order.date,
                month: order.month,
                year: order.year
            });
            if(capacityForDay.quantity+order.quantity>=req.body.quantity){
                capacityForDay.quantity += order.quantity-req.body.quantity;
                await capacityForDay.save();
            }else{
                req.body.quantity = order.quantity;
            }
        }

        for (const [key, value] of Object.entries(req.body)) {
            console.log(key, value);
            order[key] = value;
        }
        
        const updatedOrder = await order.save();

        res.status(200).json({
            updatedOrder: updatedOrder
        });
    }catch(err){
        res.status(500).json({
            err: 'Server failed to connect to the database'
        });
    }

});

module.exports = route;