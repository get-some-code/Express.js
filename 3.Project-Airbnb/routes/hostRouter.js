// Core Module
const path = require('path');

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require('../utils/path');

hostRouter.get("/add-home", (req, res) => {
    res.sendFile(path.join(rootDir, "views", "addProperty.html"))
});

hostRouter.post("/add-home", (req, res) => {
    res.sendFile(path.join(rootDir, "views", "propertyAdded.html"))
});

module.exports = hostRouter;