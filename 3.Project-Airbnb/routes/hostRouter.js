// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const upload = require("../middleware/upload");
const { getAppHome, postAddHome } = require("../controllers/home");

hostRouter.get("/add-home", getAppHome);

hostRouter.post(
    "/add-home",
    upload.single("propertyPhoto"),
    postAddHome
);

exports.hostRouter = hostRouter;