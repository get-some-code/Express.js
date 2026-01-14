const { registeredProperty } = require("../models/property");

exports.getAppHome = (req, res) => {
    res.render('addProperty', { pageTitle: 'Register your property' });
};

exports.postAddHome = (req, res) => {
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
};