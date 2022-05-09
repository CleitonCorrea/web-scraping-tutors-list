require("dotenv/config");
const scraperObjectLogin = {
    async scraper(browser) {
        let page = await browser.newPage();

        console.log(`Navigating to ${process.env.URL_LOGIN}...`);

        await page.goto(process.env.URL_LOGIN);

        // - Acessa a página de login
        // await page.click('[href="/login"]');

        //Passando os parametros para efetuar o login
        await page.type("input#email", process.env.EMAIL);
        await page.type("input#password", process.env.PASSWORD);
        await page.click('[type="submit"]');
        await page.waitForNavigation();

        // ACESSAR essa pagina
        await page.goto(process.env.URL_PROS);

        // <a href="/pros/quote/N1UITiGb8n/4k9q_zZIn" class="btn-viewlead">View Details</a>

        await page.waitForSelector("article");
        // Get the link to all the required books
        let urls = await page.$$eval("a", (links) => {
            // Make sure the book to be scraped is in stock
            links = links.filter((link) => link.querySelector(".request-head"));
            console.log("verificando link" + links);
            // Extract the links from the data
            links = links.map((el) => el.querySelector("a").href);
            return links;
        });

        console.log(urls);
    },
};

module.exports = scraperObjectLogin;