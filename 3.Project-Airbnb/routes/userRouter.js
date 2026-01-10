// Core Module
const path = require('path');

// External Module
const express = require('express');
const userRouter = express.Router();

// Local Module
const rootDir = require('../utils/path');

userRouter.get("/", (req, res) => {
    res.sendFile(path.join(rootDir, "views", "home.html"))
});

// __dirname => refers to the current directory

module.exports = userRouter;