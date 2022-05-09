const pageScraper = require("../services/pageScraper");
const fs = require("fs");

async function scrapeLogin(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        // let scrapedData = {};
        // // Call the scraper for different set of books to be scraped
        // scrapedData["articles"] = await pageScraper.scraper(
        //     browser,
        //     "article#input"
        // );

        // await browser.close();
    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeLogin(browserInstance);