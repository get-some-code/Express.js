// Core Module
const path = require('path');

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require('../utils/path');

hostRouter.get("/add-home", (req, res) => {
    res.render('addProperty', { pageTitle: 'Register your property' });
});

const registeredProperty = [];

hostRouter.post("/add-home", (req, res) => {
    console.log('Property registered successfully for: ', req.body.houseName);
    res.render('propertyAdded', { pageTitle: 'Property added successfully' });
    registeredProperty.push({houseName: req.body.houseName});
});

exports.hostRouter = hostRouter;
exports.registeredProperty = registeredProperty;