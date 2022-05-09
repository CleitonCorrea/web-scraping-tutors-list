const scraperObjectLogin = {
    async scraper(browser, email, pass) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);

        await page.goto("https://www.tutors.com/login");

        // - Acessa a página de login
        // await page.click('[href="/login"]');

        // Troque os valores de process.env.UNSPLASH_EMAIL e process.env.UNSPLASH_PASS pelo seu login e senha :)
        await page.type("input#email", "cleitoncorreadesigner@gmail.com");
        await page.type("input#password", "alfenas123");
        await page.click('[type="submit"]');
        await page.waitForNavigation();

        // ACESSAR essa pagina
        await page.goto("https://tutors.com/pros/requests");

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