// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const upload = require("../middleware/upload");
const { getAppHome, postAddHome, getHostPanelPage, postEditHome, postDeleteHome } = require("../controllers/home");

hostRouter.get("/add-home", getAppHome);

hostRouter.post(
    "/add-home",
    upload.single("propertyPhoto"),
    postAddHome
);

hostRouter.get("/host-property-list", getHostPanelPage)

// Post edit property
hostRouter.post(
    "/edit-home/:id",
    upload.single("propertyPhoto"),
    postEditHome
);

// Post delete property
hostRouter.post("/delete-home/:id", postDeleteHome);

exports.hostRouter = hostRouter;