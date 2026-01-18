// Core Module
const path = require("path");

// External Module
const express = require("express");
const userRouter = express.Router();

// Local Module (import from model, NOT router)
const { getHomePage, getBookingPage, getPropertyDetailsPage } = require("../controllers/home");

userRouter.get("/", getHomePage );
userRouter.get(`/booking/:id`, getBookingPage);
userRouter.get(`/property/:id`, getPropertyDetailsPage);

module.exports = userRouter;