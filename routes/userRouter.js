// Core Module
const path = require("path");

// External Module
const express = require("express");
const userRouter = express.Router();

// Local Module (import from controller)
const { 
    getHomePage, 
    getBookingPage, 
    getPropertyDetailsPage, 
    getFavouritesPage,
    postAddToFavourites,
    postRemoveFromFavourites,
    checkFavouriteStatus
} = require("../controllers/home");

// Page routes
userRouter.get("/", getHomePage);
userRouter.get("/booking/:id", getBookingPage);
userRouter.get("/property/:id", getPropertyDetailsPage);
userRouter.get("/favourites", getFavouritesPage);

// Favourites API routes
userRouter.post("/favourites/add/:id", postAddToFavourites);
userRouter.post("/favourites/remove/:id", postRemoveFromFavourites);
userRouter.get("/favourites/check/:id", checkFavouriteStatus);

module.exports = userRouter;