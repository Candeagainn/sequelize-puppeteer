import puppeteer from "puppeteer";


class BaseScraper {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async init() {
        this.browser = await puppeteer.launch({ headless: false });
        this.page = await this.browser.newPage();
    }
    async newTab(){
        await this.browser.newPage();
    }

    async openWebPage(url) {
        await this.page.goto(url);
        try {
            await this.page.waitForSelector('button#onetrust-reject-all-handler');
            await this.page.click('button#onetrust-reject-all-handler');
        } catch (error) {
            console.log('La página no se cargó o no se encontró el selector');
        }
    }

    async close() {
        await this.browser.close();
    }
}

export default BaseScraper;
