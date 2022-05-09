var express = require("express");

const router = express.Router();
const alertCronDispatch = [];
const dispacthScrapingPage = false;
const browserObject = require("../browser.js");
const scraperController = require("../controllers/scrapController");
const scraperControllerLogin = require("../controllers/scrapControllerLogin");
const user = require("../model/user");

/* GET page login. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Scraping Page Tutors" });
});

router.post("/login", function(req, res, next) {
    user.email = req.body.email;
    let password = req.body.password;
    let valor = req.body.valor;
    let msg = req.body.msg;
    // let user = User(email, password, valor, msg);

    console.log(user.email);

    //Criando uma instancia do browser
    let browserInstance = browserObject.startBrowser();

    //Instância a tela de login a primeira vez
    scraperControllerLogin(browserInstance);

    //Verificar Status da página
    // scraperController(browserInstance);
});

module.exports = router;