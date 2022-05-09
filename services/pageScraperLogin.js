const scraperObjectLogin = {
    url: "https://www.tutors.com/login",
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        // Navigate to the selected page
        await page.goto(this.url);
        //Verification is logon
        await page.waitForSelector("input[name=email]");

        await page.type("input[name=name]", "Cleiton@gmail.com");
        await page.$eval(
            "input[name=email]",
            (el) => (el.value = "Cleiton@correa.com")
        );

        await page.click('input[type="submit"]');
        await page.waitForSelector("#mw-content-text");
        // const text = await page.evaluate(() => {
        //     const anchor = document.querySelector("#mw-content-text");
        //     return anchor.textContent;
        // });
        console.log(text);
        await browser.close();
    },
};

module.exports = scraperObjectLogin;