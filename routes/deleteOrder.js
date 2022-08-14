const express = require('express');
const Order = require('../models/order');
const Capacity = require('../models/capacityPerDay');

const route = express.Router();
route.use(express.json());
route.delete('/delete/:id', async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(order.status!=='delivered')
        {
            const date = order.date;
            const month = order.month;
            const year = order.year;
            const capacityForDay = await Capacity.findOne({
                date: date,
                month: month,
                year: year
            });

            capacityForDay.quantity += order.quantity;
            await capacityForDay.save();
        }
        const deletedOrder = await Order.findByIdAndRemove(req.params.id);

        res.status(200).json({
            deletedOrder: deletedOrder
        });
    }catch(err){
        res.status(500).json({
            err: 'Server failed to delete the order.'
        });
    }

});

module.exports = route;