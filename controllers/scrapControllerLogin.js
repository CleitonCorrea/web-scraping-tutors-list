const pageScraperLogin = require("../services/pageScraperLogin");
const fs = require("fs");

async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        let scrapedData = {};
        // Call the scraper for different set of books to be scraped
        scrapedData["log"] = await pageScraperLogin.scraper(browser, "input#name");

        await browser.close();

        //Salva logs de login
        fs.writeFile(
            "data.json",
            JSON.stringify(scrapedData),
            "utf8",
            function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log(
                    "The data has been scraped and saved successfully! View it at './data.json'"
                );
            }
        );
    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);