require("dotenv/config");
var express = require("express");

const router = express.Router();
const browserObject = require("../browser.js");
const scraperControllerLogin = require("../controllers/scrapControllerLogin");
const checkJobsScraping = require("../services/checkJobsScraping");
let email = process.env.EMAIL != "" ? process.env.EMAIL : "Email:";

console.log(`Adicionando email ao titulo: ${email}`);

/* GET page login. */
router.get("/", function(req, res, next) {
    res.render("index", { email: email });
});

router.post("/login", function(req, res, next) {
    //Criando uma instancia do browser
    var browserInstance = browserObject.startBrowser();

    process.env.EMAIL = req.body.email;
    process.env.PASSWORD = req.body.password;
    process.env.VALOR = req.body.valor;
    process.env.MSG = req.body.msg;

    console.log(`O usuário ${process.env.EMAIL} está logando...`);

    //Instância a tela de login a primeira vez
    scraperControllerLogin(browserInstance);

    console.log("Fim da execução...");
    console.log("Aguardando 5 minutos...");

    //Chamando um temporizados para iniciar o ciclo de scraping
    setTimeout(function() {
        console.log("O script esta sendo executado novamente...");
        console.log("Checando se a atividades a serem avaliadas...");

        let checkScraping = checkJobsScraping.scraper();

        if (checkScraping) {
            scraperControllerLogin(browserInstance);
        }
    }, 5 * 60 * 1000);
});

module.exports = router;