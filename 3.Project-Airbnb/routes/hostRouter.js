// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const upload = require('../middleware/upload');

hostRouter.get("/add-home", (req, res) => {
    res.render('addProperty', { pageTitle: 'Register your property' });
});

const registeredProperty = [];

hostRouter.post(
    "/add-home",
    upload.single("propertyPhoto"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).send("Property image is required");
        }

        registeredProperty.push({
            houseName: req.body.houseName,
            pricePerNight: req.body.pricePerNight,
            propertyLocation: req.body.propertyLocation,
            propertyPhoto: req.file.filename
        });

        console.log(
            "Property registered successfully for:",
            req.body.houseName
        );

        res.render("propertyAdded", {
            pageTitle: "Property added successfully"
        });
    }
);


exports.hostRouter = hostRouter;
exports.registeredProperty = registeredProperty;