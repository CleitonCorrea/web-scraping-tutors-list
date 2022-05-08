const pageScraper = require("../services/pageScraper");
const fs = require("fs");

async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        let scrapedData = {};
        // Call the scraper for different set of books to be scraped
        scrapedData["articles"] = await pageScraper.scraper(
            browser,
            "article#input"
        );

        await browser.close();
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

async function scrapeLogin(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        let scrapedData = {};
        // Call the scraper for different set of books to be scraped
        scrapedData["article"] = await pageScraper.scraper(browser, "article");

        await browser.close();
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