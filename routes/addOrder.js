const express = require('express');
const Order = require('../models/order');
const Capacity = require('../models/capacityPerDay');

const route = express.Router();
route.use(express.json());
route.post('/add', async (req, res) => {
    const presenttDate = new Date();
    let date = presenttDate.getDate();
    let month = presenttDate.getMonth()+1;
    let year = presenttDate.getFullYear();
    if(req.body.year)
        year = req.body.year;
    if(req.body.month)
        month = req.body.month;
    if(req.body.date)
        date = req.body.date;

    
    let capacityForDay;
    capacityForDay = await Capacity.findOne({
        date: date,
        month: month,
        year: year
    }).select({quantity: 1});

    if(!capacityForDay){
        const totalCapForDay = new Capacity({
            date: date,
            month: month,
            year: year
        });
        capacityForDay = await totalCapForDay.save(); 
    }

    if(capacityForDay.quantity<req.body.quantity)
        res.status(406).json({
            err: 'Not enough milk available for the specified day',
            quantityAvailable: capacityForDay.quantity
        });
    else{
        const newOrder = new Order({
            quantity: req.body.quantity,
            date: date,
            month: month,
            year: year,
            status: req.body.status || 'placed'
        });
        const placedOrder = await newOrder.save();
        capacityForDay.quantity -= req.body.quantity;
        await capacityForDay.save();
        res.status(201).json({
            orderPlacement: 'successful',
            orderDetails: placedOrder
        });
    }

});

module.exports = route;