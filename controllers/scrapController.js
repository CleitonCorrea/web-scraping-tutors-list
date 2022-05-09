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

async function scrapingCron(callback, startTime, interval, threshold) {
    function callbackWithTimeout() {
        var timeout =
            interval === undefined ? null : setTimeout(callbackWithTimeout, interval);
        callback(timeout);
    }
    if (startTime === undefined) {
        // Corre em intervalos a partir do próximo ciclo de eventos
        return setTimeout(callbackWithTimeout, 0);
    }
    // Limitar startTime a hora de um dia
    startTime %= 86400000;
    var currentTime = new Date() % 86400000;
    if (interval === undefined) {
        // Corre uma vez
        // Se startTime é no passado, corre no próximo ciclo de eventos
        // Senão, espera o tempo suficiente
        return setTimeout(
            callbackWithTimeout,
            Math.max(0, startTime - currentTime)
        );
    } else {
        var firstInterval = (startTime - currentTime) % interval;
        if (firstInterval < 0) firstInterval += interval;
        // Se falta mais do que threshold para a próxima hora,
        // corre no próximo ciclo de eventos, agenda para a próxima hora
        // e depois continua em intervalos
        if (threshold === undefined || firstInterval > threshold) {
            return setTimeout(function() {
                var timeout = setTimeout(callbackWithTimeout, firstInterval);
                callback(timeout);
            }, 0);
        }
        // Senão, começa apenas na próxima hora e continua em intervalos
        return setTimeout(callbackWithTimeout, firstInterval);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);