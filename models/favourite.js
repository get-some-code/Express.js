const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const favouriteDataPath = path.join(rootDir, 'data', 'favourites.json');

class Favourite {

    static _ensureFileExists() {
        if (!fs.existsSync(favouriteDataPath)) {
            fs.writeFileSync(favouriteDataPath, JSON.stringify([], null, 2));
        }
    }

    static _safeWrite(data, callback) {
        const tempPath = favouriteDataPath + '.tmp';

        fs.writeFile(tempPath, JSON.stringify(data, null, 2), (err) => {
            if (err) return callback("File write error");

            fs.rename(tempPath, favouriteDataPath, (renameErr) => {
                if (renameErr) return callback("File rename error");

                callback(null);
            });
        });
    }

    static getFavourites(callback) {

        Favourite._ensureFileExists();

        fs.readFile(favouriteDataPath, 'utf8', (err, data) => {

            if (err) {
                return callback([]);
            }

            if (!data || data.trim() === '') {
                return callback([]);
            }

            try {
                const parsed = JSON.parse(data);

                // Ensure it's always an array
                if (!Array.isArray(parsed)) {
                    throw new Error("Invalid format");
                }

                callback(parsed);

            } catch (error) {
                console.error("Invalid JSON in favourites.json. Resetting file.");
                fs.writeFileSync(favouriteDataPath, JSON.stringify([], null, 2));
                callback([]);
            }

        });
    }

    static addToFavourite(propertyID, callback) {

        if (!propertyID) {
            return callback("Invalid property ID");
        }

        Favourite.getFavourites((favourites) => {

            if (favourites.includes(propertyID)) {
                return callback("Property already in favourites");
            }

            favourites.push(propertyID);

            Favourite._safeWrite(favourites, callback);
        });
    }

    static removeFromFavourite(propertyID, callback) {

        if (!propertyID) {
            return callback("Invalid property ID");
        }

        Favourite.getFavourites((favourites) => {

            const updated = favourites.filter(id => id !== propertyID);

            Favourite._safeWrite(updated, callback);
        });
    }

}

module.exports = Favourite;