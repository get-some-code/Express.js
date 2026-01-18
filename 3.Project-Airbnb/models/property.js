const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
module.exports = class Property {
    constructor(propertyName, propertyPrice, propertyLocation, propertyPhoto, _id) {
        this.propertyName = propertyName;
        this.pricePerNight = propertyPrice;
        this.propertyLocation = propertyLocation;
        this.propertyPhoto = propertyPhoto;
        this._id = Date.now() + '-' + Math.random().toString(36);
    }

    save() {
        Property.fetchProperty(registeredProperty => {
            registeredProperty.push(this);
            const filePath = path.join(rootDir, 'data', 'properties.json');
            fs.writeFile(
                filePath,
                JSON.stringify(registeredProperty),
                err => {
                    console.log(err)
                });
        })
    }

    static fetchProperty(callback) {
        const filePath = path.join(rootDir, 'data', 'properties.json');
        fs.readFile(filePath, (err, data) => {
            callback(!err ? JSON.parse(data) : [])
        });
    }

    static findById(propertyID, callback) {
        const filePath = path.join(rootDir, 'data', 'properties.json');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                return callback(null);
            }

            const properties = JSON.parse(data);
            const foundProperty = properties.find(property => property._id === propertyID);

            callback(foundProperty || null);
        });
    }

    // Update property by ID
    static updateById(id, updatedProperty, callback) {
        const filePath = path.join(rootDir, 'data', 'properties.json');

        fs.readFile(filePath, (err, data) => {
            let properties = [];

            if (!err) {
                properties = JSON.parse(data);
            }

            // Find and update the property
            const index = properties.findIndex(prop => prop._id === id);

            if (index !== -1) {
                // Keep the old photo if no new one is provided
                if (!updatedProperty.propertyPhoto) {
                    updatedProperty.propertyPhoto = properties[index].propertyPhoto;
                }

                properties[index] = { ...properties[index], ...updatedProperty };

                fs.writeFile(filePath, JSON.stringify(properties, null, 2), (err) => {
                    callback(err);
                });
            } else {
                callback(new Error('Property not found'));
            }
        });
    }

    // Delete property by ID
    static deleteById(id, callback) {
        const filePath = path.join(rootDir, 'data', 'properties.json');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                return callback(err);
            }

            let properties = JSON.parse(data);

            // Filter out the property to delete
            const filteredProperties = properties.filter(prop => prop._id !== id);

            // Optional: Delete the property photo from uploads folder
            const deletedProperty = properties.find(prop => prop._id === id);
            if (deletedProperty && deletedProperty.propertyPhoto) {
                const photoPath = path.join(rootDir, 'public', 'uploads', deletedProperty.propertyPhoto);
                fs.unlink(photoPath, (err) => {
                    if (err) console.log('Error deleting photo:', err);
                });
            }

            fs.writeFile(filePath, JSON.stringify(filteredProperties, null, 2), (err) => {
                callback(err);
            });
        });
    }
};