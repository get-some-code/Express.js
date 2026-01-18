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

exports.getPropertyDetailsPage = (req, res) => {
    const propertyId = req.params.id;

    Property.findById(propertyId, (property) => {
        if (!property) {
            return res.redirect('/');
        }

        res.render("store/propertyDetails", {
            registeredProperty: [property],
            pageTitle: "Check Property Details"
        })
    })
}

exports.getHostPanelPage = (req, res) => {
    Property.fetchProperty((registeredProperty) => {
        res.render("admin/hostPanel", {
            registeredProperty: registeredProperty,
            pageTitle: "Host Panel"
        })
    })
}

// Edit property
exports.postEditHome = (req, res) => {
    const propertyId = req.params.id;
    const { propertyName, propertyLocation, pricePerNight } = req.body;
    
    // If new photo uploaded, use it; otherwise keep the old one
    const propertyPhoto = req.file ? req.file.filename : req.body.oldPhoto;
    
    const updatedProperty = {
        _id: propertyId,
        propertyName,
        propertyLocation,
        pricePerNight,
        propertyPhoto
    };
    
    Property.updateById(propertyId, updatedProperty, () => {
        res.redirect('/host/host-property-list');
    });
};

// Delete property
exports.postDeleteHome = (req, res) => {
    const propertyId = req.params.id;
    
    Property.deleteById(propertyId, () => {
        res.redirect('/host/host-property-list');
    });
};