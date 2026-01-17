const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
let registeredProperty = [];
module.exports = class Property {
    constructor(propertyName, propertyPrice, propertyLocation, propertyPhoto) {
        this.propertyName = propertyName;
        this.pricePerNight = propertyPrice;
        this.propertyLocation = propertyLocation;
        this.propertyPhoto = propertyPhoto;
    }

    save() {
        fetchProperty(registeredProperty => {
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
};