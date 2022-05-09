require("dotenv/config");
var express = require("express");

const router = express.Router();
const alertCronDispatch = [];
const dispacthScrapingPage = false;
const browserObject = require("../browser.js");
const scraperController = require("../controllers/scrapController");
const scraperControllerLogin = require("../controllers/scrapControllerLogin");

/* GET page login. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Scraping Page Tutors" });
});

router.post("/login", function(req, res, next) {
    process.env.EMAIL = req.body.email;
    process.env.PASSWORD = req.body.password;
    process.env.VALOR = req.body.valor;
    process.env.MSG = req.body.msg;
    let checkLogin = true;

    console.log(`O usuário ${process.env.EMAIL} está logando...`);

    //Criando uma instancia do browser
    let browserInstance = browserObject.startBrowser();

    //Instância a tela de login a primeira vez
    scraperControllerLogin(browserInstance);

    //Aguardando 5 minutos para executar novamente
    if (checkLogin) {
        console.log("Aguardando 5 minutos...");
        setTimeout(function() {
            console.log("O script esta sendo executado novamente...");
            scraperControllerLogin(browserInstance);
        }, 5 * 60 * 1000);
    }
});

module.exports = router;