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



//     const browser = await puppeteer.launch({
//     headless: false
//     });
//     const page = await browser.newPage();

//     async function openWebPage(){
//     await page.goto("https://int.soccerway.com/national/argentina/primera-division/2024/2nd-phase/r80132/venues/");
    
//     try{
//         await page.waitForSelector('button#onetrust-reject-all-handler');
//     await page.click('button#onetrust-reject-all-handler');
//     } catch(error){
//         console.log('La página no se cargó o no se encontró el selector')
//     }
// }

// async function scrapeStadiums(){
//     await openWebPage()
//     const result = await page.evaluate(()=> {
//         const lista = document.querySelectorAll('.right');
//         const nombres = [...lista].map(e => e.querySelector('h4 > a').innerText);
//         const capacidad = [...lista].map(e => e.querySelector('.details > dd:nth-child(4)').innerText);
//         console.log([nombres])
//         return{
//             nombres,
//             capacidad
//         }
//     })
//     console.log(result);
//     await browser.close();
// }

// scrapeStadiums();

