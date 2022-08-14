const express = require('express');
const Capacity = require('../models/capacityPerDay');

const route = express.Router();
route.use(express.json());
route.get('/checkCapacity/:date', async (req, res) => {
    const date = Number(req.params.date.substring(0, 2));
    const month = Number(req.params.date.substring(2, 4));
    const year = Number(req.params.date.substring(4, 8));
    
    const capacityForDay = await Capacity.findOne({
        date: date,
        month: month,
        year: year
    }).select({quantity: 1});

    if(capacityForDay)
        res.status(200).json({
            date: req.params.date,
            quantity: capacityForDay.quantity
        });
    else
        res.status(200).json({
            date: req.params.date,
            quantity: 1000
        });
});

module.exports = route;
