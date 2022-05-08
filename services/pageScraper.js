const scraperObject = {
    url: "https://tutors.com/pros/requests",
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        // Navigate to the selected page
        await page.goto(this.url);
        //Verification is logon

        // Wait for the required DOM to be rendered
        await page.waitForSelector(".pro-requests");
        // Get the link to all the required books
        let urls = await page.$$eval("article", (links) => {
            // Make sure the book to be scraped is in stock
            links = links.filter(
                (link) => link.querySelector(".request-box").textContent !== "In stock"
            );
            // Extract the links from the data
            links = links.map((el) => el.querySelector("a").href);
            return links;
        });

        // Loop through each of those links, open a new page instance and get the relevant data from them
        let pagePromise = (link) =>
            new Promise(async(resolve, reject) => {
                let dataObj = {};
                let newPage = await browser.newPage();
                await newPage.goto(link);
                dataObj["Disciplina"] = await newPage.$eval(
                    ".unread-lead > h2",
                    (text) => text.textContent
                );
                dataObj["Aluno"] = await newPage.$eval(
                    ".mb8",
                    (text) => text.textContent
                );
                // dataObj["noAvailable"] = await newPage.$eval(
                //     ".instock.availability",
                //     (text) => {
                //         // Strip new line and tab spaces
                //         text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
                //         // Get the number of stock available
                //         let regexp = /^.*\((.*)\).*$/i;
                //         let stockAvailable = regexp.exec(text)[1].split(" ")[0];
                //         return stockAvailable;
                //     }
                // );
                // dataObj["imageUrl"] = await newPage.$eval(
                //     "#product_gallery img",
                //     (img) => img.src
                // );
                // dataObj["bookDescription"] = await newPage.$eval(
                //     "#product_description",
                //     (div) => div.nextSibling.nextSibling.textContent
                // );
                // dataObj["upc"] = await newPage.$eval(
                //     ".table.table-striped > tbody > tr > td",
                //     (table) => table.textContent
                // );
                resolve(dataObj);
                await newPage.close();
            });

        for (link in urls) {
            let currentPageData = await pagePromise(urls[link]);
            // scrapedData.push(currentPageData);
            console.log(currentPageData);
        }
    },
};

module.exports = scraperObject;