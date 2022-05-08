const PuppeteerEmail = require("puppeteer-email");
const client = new PuppeteerEmail("outlook");
const username = email;
const password = password;
const session = await client.signin({ username, password });
const emails = await session.getEmails({ query: "from:github" });
await session.close();
console.log(emails);