// Core Module
const path = require("path");

// External Module
const express = require("express");
const userRouter = express.Router();

// Local Module (✅ import from model, NOT router)
const { getHomePage } = require("../controllers/home");

userRouter.get("/", getHomePage );

module.exports = userRouter;