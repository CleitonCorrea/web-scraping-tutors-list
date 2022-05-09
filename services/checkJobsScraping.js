require("dotenv/config");
const checkJobsScraping = {
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

        //Faz a checagem
        let searchBox = await page.waitForXPath(
            "/html/body/div[3]/div[9]/div[2]/div[1]/article[1]/div/a", {
                visible: true,
            }
        );
        if (searchBox === null) {
            //Verificando se a links
            console.log("Não á links no momento...");
            console.log("Checagem realizada com sucesso!");

            return false;
        }

        await searchBox.type("Views Details");

        let btnSearch = await page.waitForXPath(
            "/html/body/div[3]/div[9]/div[2]/div[1]/article[1]/div/a", { visible: true }
        );
        btnSearch.click();
    },
};

module.exports = checkJobsScraping;