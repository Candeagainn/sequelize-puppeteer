import BaseScraper from "../scraper.js";

class equipoScraper extends BaseScraper{
    constructor(){
        super();
    }

    async scrapeTeams(Url){
        await this.init();
        await this.openWebPage(Url)
        const linksEquipos = await this.page.evaluate(()=>{
            const links = document.querySelectorAll('table[data-round_id="80132"] > tbody > tr')
            return [...links].map(e => e.getAttribute('href'));
        })
        // const equipoInfo = await this.page.evaluate(() => {
        //     const nombre = document.querySelector('#subheading > h1').innerText;
        //     const ciudad = document.querySelector('.details > dd:nth-child(4)');

        // })
    }

} export default equipoScraper;