const scraperObjectLogin = {
    url: "https://www.tutors.com/login",
    async scraper(browser) {
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

        // Like nessa coisa
        await page.click('[title="Like photo"]');
    },
};

module.exports = scraperObjectLogin;