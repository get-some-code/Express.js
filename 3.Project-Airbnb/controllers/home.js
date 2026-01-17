const Property = require("../models/property");

exports.getAppHome = (req, res) => {
    res.render('admin/addProperty', { pageTitle: 'Register your property' });
};

exports.postAddHome = (req, res) => {
    if (!req.file) {
        return res.status(400).send("Property image is required");
    }

    const { propertyName, pricePerNight, propertyLocation, _id } = req.body;
    const propertyPhoto = req.file.filename;
    const property = new Property(propertyName, pricePerNight, propertyLocation, propertyPhoto, _id);
    property.save();

    console.log(
        "Property registered successfully for:",
        propertyName
    );
    res.render("admin/propertyAdded", {
        pageTitle: "Property added successfully"
    });
};

exports.getHomePage = (req, res) => {
    Property.fetchProperty((registeredProperty) =>
        res.render("store/home",
            {
                registeredProperty: registeredProperty,
                pageTitle: "Airbnb | Holiday rentals, cabins, beach house & more"
            }
        )
    );

};

exports.getBookingPage = (req, res) => {
    const propertyId = req.params.id;

    Property.findById(propertyId, (property) => {
        if (!property) {
            return res.redirect('/');
        }

        res.render("store/booking", {
            registeredProperty: [property],
            pageTitle: "Book your stay"
        });
    });
}