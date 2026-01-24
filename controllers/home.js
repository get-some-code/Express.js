const Property = require("../models/property");
const Favourite = require("../models/favourite");


/* ======================================
   ADMIN - ADD PROPERTY
====================================== */

exports.getAppHome = (req, res) => {
    res.render('admin/addProperty', {
        pageTitle: 'Register your property'
    });
};

exports.postAddHome = (req, res) => {

    if (!req.file) {
        return res.status(400).send("Property image is required");
    }

    const { propertyName, pricePerNight, propertyLocation, _id } = req.body;
    const propertyPhoto = req.file.filename;

    const property = new Property(
        propertyName,
        pricePerNight,
        propertyLocation,
        propertyPhoto,
        _id
    );

    property.save();

    console.log("Property registered successfully for:", propertyName);

    res.render("admin/propertyAdded", {
        pageTitle: "Property added successfully"
    });
};



/* ======================================
   HOME PAGE
====================================== */

exports.getHomePage = (req, res) => {

    Favourite.getFavourites((favouriteIds) => {

        Property.fetchProperty((registeredProperty) => {

            res.render("store/home", {
                registeredProperty,
                favourites: favouriteIds,
                pageTitle: "Airbnb | Holiday rentals, cabins, beach house & more"
            });

        });

    });

};



/* ======================================
   BOOKING & DETAILS
====================================== */

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
};

exports.getPropertyDetailsPage = (req, res) => {
    const propertyId = req.params.id;

    Property.findById(propertyId, (property) => {

        if (!property) {
            return res.redirect('/');
        }

        res.render("store/propertyDetails", {
            registeredProperty: [property],
            pageTitle: "Check Property Details"
        });

    });
};



/* ======================================
   HOST PANEL
====================================== */

exports.getHostPanelPage = (req, res) => {

    Property.fetchProperty((registeredProperty) => {

        res.render("admin/hostPanel", {
            registeredProperty,
            pageTitle: "Host Panel"
        });

    });

};


exports.postEditHome = (req, res) => {

    const propertyId = req.params.id;
    const { propertyName, propertyLocation, pricePerNight } = req.body;

    const propertyPhoto = req.file
        ? req.file.filename
        : req.body.oldPhoto;

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


exports.postDeleteHome = (req, res) => {

    const propertyId = req.params.id;

    Property.deleteById(propertyId, () => {
        res.redirect('/host/host-property-list');
    });

};



/* ======================================
   FAVOURITES PAGE
====================================== */

exports.getFavouritesPage = (req, res) => {

    Favourite.getFavourites((favouriteIds) => {

        Property.fetchProperty((allProperties) => {

            const favouriteProperties = allProperties.filter(property =>
                favouriteIds.includes(property._id)
            );

            res.render("store/favourites", {
                favouriteProperties,
                pageTitle: "Your Favourites"
            });

        });

    });

};



/* ======================================
   ADD TO FAVOURITES
====================================== */

exports.postAddToFavourites = (req, res) => {

    const propertyId = req.params.id;

    Favourite.addToFavourite(propertyId, (err) => {

        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }

        res.json({
            success: true,
            message: "Added to favourites"
        });

    });

};



/* ======================================
   REMOVE FROM FAVOURITES
====================================== */

exports.postRemoveFromFavourites = (req, res) => {

    const propertyId = req.params.id;

    Favourite.removeFromFavourite(propertyId, (err) => {

        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }

        res.json({
            success: true,
            message: "Removed from favourites"
        });

    });

};



/* ======================================
   CHECK FAVOURITE STATUS (OPTIONAL)
====================================== */

exports.checkFavouriteStatus = (req, res) => {

    const propertyId = req.params.id;

    Favourite.getFavourites((favouriteIds) => {

        res.json({
            isFavourite: favouriteIds.includes(propertyId),
            favouritesCount: favouriteIds.length
        });

    });

};