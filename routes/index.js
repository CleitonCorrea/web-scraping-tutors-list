var express = require("express");
var router = express.Router();

const browserObject = require("../browser.js");
const scraperController = require("../controllers/scrapController");

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});

router.post("/login", function(req, res, next) {
    //Start the browser and create a browser instance
    let browserInstance = browserObject.startBrowser();
    // Pass the browser instance to the scraper controller
    scraperController(browserInstance);
});

module.exports = router;