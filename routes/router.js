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
    let email = req.body.email !== "" ? req.body.email : false;
    let password = req.body.password !== "" ? req.body.password : false;
    let valor = req.body.valor;
    let msg = req.body.msg;
    let checkLogin = true;

    console.log(`O usuário ${email} está logando...`);

    //Criando uma instancia do browser
    let browserInstance = browserObject.startBrowser();

    //Instância a tela de login a primeira vez
    scraperControllerLogin(browserInstance, email, password, valor, msg);

    //Aguardando 5 minutos para executar novamente
    if (checkLogin) {
        console.log("Aguardando 5 minutos...");
        setTimeout(function() {
            console.log("O script esta sendo executado novamente...");
            scraperControllerLogin(browserInstance, email, password, valor, msg);
        }, 5 * 60 * 1000);
    }
});

module.exports = router;