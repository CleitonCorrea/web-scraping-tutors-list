require("dotenv/config");
const scraperObjectLogin = {
    async scraper(browser) {
        let page = await browser.newPage();
        let link = [];

        console.log(`Acessando a URL: ${process.env.URL_LOGIN}...`);

        await page.goto(process.env.URL_LOGIN);

        //Passando os parametros para efetuar o login
        await page.type("input#email", process.env.EMAIL);
        await page.type("input#password", process.env.PASSWORD);
        await page.click('[type="submit"]');
        await page.waitForNavigation();

        //Acessa essa pagina de jobs
        await page.goto(process.env.URL_PROS);

        let btnSearch = await page.waitForXPath(
            '//*[@id="6278f7e455a8236d70f7c68d"]/div/a', { visible: true }
        );
        btnSearch.click();

        await page.waitForNavigation(".quote-panel thin");

        //x-patc text ares = //*[@id="quote-message"]
        //x-patch botao = //*[@id="send-quote"]
        //x-pacth input = //*[@id="quote-price"]
        await page.type("#quote-price", process.env.VALOR);
        await page.type("#quote-message", process.env.MSG);
        await page.click("#send-quote");
        await page.waitForNavigation();

        //Acessa essa pagina de jobs
        await page.goto(process.env.URL_PROS);
        browser.close();

        //O Ciclo se Inicia Novamente, pois aqui é a tela de
        console.log(`Enviando email para o aluno: ${process.env.EMAIL}`);
    },
};

module.exports = scraperObjectLogin;