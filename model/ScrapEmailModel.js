const PuppeteerEmail = require("puppeteer-email");
const client = new PuppeteerEmail("outlook");
a

const ScrapEmailService = {

    dispatchEmailEstudants(remetent, destinatario, email, ) {

        const username = email;
        const password = password;
        //const session = await client.signin({ username, password });
        const emails = await session.getEmails({ query: destinatario });
        const client = new PuppeteerEmail('test@outlook.com')
        const session = await client.signin({ email: 'test@outlook.com', password: 'xxx' })
        console.log(emails);
        await session.close()

    },
};

module.exports = ScrapEmailService;