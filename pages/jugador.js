import BaseScraper from "../scraper.js"

class JugadorScraper extends BaseScraper {
    constructor(){
        super();
    }

    async scrapePlayers(){
        await this.init();
        await this.openWebPage("https://int.soccerway.com/teams/argentina/ca-belgrano-de-cordoba/114/squad/");

        const playerLinks = await this.page.evaluate(() => {
            const links = document.querySelectorAll('.name large-link')
            const allLinks = [...links].map(e => e.getAttribute('href'));
            console.log('holasi');
            return {
                allLinks
            }
            
    })
    console.log(playerLinks);
    await this.close();
}
}
    export default JugadorScraper;