// Core Module
const path = require("path");

// External Module
const express = require("express");
const userRouter = express.Router();

// Local Module (import from model, NOT router)
const { getHomePage, getBookingPage } = require("../controllers/home");

userRouter.get("/", getHomePage );
userRouter.get(`/booking/:id`, getBookingPage);

module.exports = userRouter;