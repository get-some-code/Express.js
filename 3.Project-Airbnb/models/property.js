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
};