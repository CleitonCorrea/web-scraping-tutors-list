const pageScraperLogin = require("../services/pageScraper");
const fs = require("fs");

async function scrapeLogin(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeLogin(browserInstance);