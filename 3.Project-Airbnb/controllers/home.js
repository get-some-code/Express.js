const Property = require("../models/property");

exports.getAppHome = (req, res) => {
    res.render('addProperty', { pageTitle: 'Register your property' });
};

exports.postAddHome = (req, res) => {
    if (!req.file) {
        return res.status(400).send("Property image is required");
    }

    const { propertyName, pricePerNight, propertyLocation } = req.body;
    const propertyPhoto = req.file.filename;
    const property = new Property(propertyName, pricePerNight, propertyLocation, propertyPhoto);
    property.save();

    console.log(
        "Property registered successfully for:",
        propertyName
    );
    res.render("propertyAdded", {
        pageTitle: "Property added successfully"
    });
};

exports.getHomePage = (req, res) => {
    Property.fetchProperty((registeredProperty) =>
        res.render("home",
            {
                registeredProperty: registeredProperty,
                pageTitle: "Airbnb | Holiday rentals, cabins, beach house & more"
            }
        )
     );

};