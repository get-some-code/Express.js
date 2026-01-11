// Core Module
const path = require('path');

// External Module
const express = require('express');
const userRouter = express.Router();

// Local Module
const { registeredProperty } = require('./hostRouter');

userRouter.get("/", (req, res) => {
    console.log(registeredProperty);
    res.render('home', { registeredProperty: registeredProperty, pageTitle: 'Airbnb | Holiday rentals, cabins, beach house & more' });
});

// __dirname => refers to the current directory

module.exports = userRouter;