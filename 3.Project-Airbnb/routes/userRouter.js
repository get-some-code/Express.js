// Core Module
const path = require("path");

// External Module
const express = require("express");
const userRouter = express.Router();

// Local Module (✅ import from model, NOT router)
const { registeredProperty } = require("../models/property");

userRouter.get("/", (req, res) => {
    console.log(registeredProperty);

    res.render("home", {
        registeredProperty: registeredProperty,
        pageTitle: "Airbnb | Holiday rentals, cabins, beach house & more"
    });
});

module.exports = userRouter;