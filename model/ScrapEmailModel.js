const PuppeteerEmail = require("puppeteer-email");
const client = new PuppeteerEmail("outlook");

a

const ScrapEmailService = {

    dispatchEmailEstudants(remetent, password, destinatario, email, ) {

        const session = await client.signin({ remetent, password })
        const emails = await session.getEmails({ query: 'from:github' })
        await session.close()

        console.log(emails)

    },
};

module.exports = ScrapEmailService;