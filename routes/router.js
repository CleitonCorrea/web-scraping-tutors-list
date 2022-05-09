var express = require("express");
var router = express.Router();

const browserObject = require("../browser.js");
const scraperController = require("../controllers/scrapController");
const dispacthScrapingPage;
const alertCronDispatch = [];

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});

router.post("/login", function(req, res, next) {

    let email = req.body.name;
    let password = req.body.password;
    let valor = req.body.valor;
    let msg = req.body.msg;
    //Start the browser and create a browser instance
    let browserInstance = browserObject.startBrowser();
    // Pass the browser instance to the scraper controller
    for (let i = 0; i <= 60; i = i + 5) {
        alertCronDispatch.push(
            new Cron.Job(i + " * * * *", function() {
                dispacthScrapingPage = true;
            })
        );
    }

    if (dispacthScrapingPage) {
        //executa a varredura na página
        scraperController(browserInstance);
    }

    //Verificar Status da página
    scraperController(browserInstance);
});

module.exports = router;