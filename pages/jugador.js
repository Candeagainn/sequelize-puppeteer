import BaseScraper from "../scraper.js"

class JugadorScraper extends BaseScraper {
    constructor(){
        super();
    }

    async getLinks(teamUrl){
        await this.init();
        await this.openWebPage(teamUrl);

        const playerLinks = await this.page.evaluate(() => {
            const links = document.querySelectorAll('.name.large-link a')
            const allLinks = [...links].map(e => e.getAttribute('href'));
            console.log('holasi');
            return {
                allLinks
            }

            
    })
    console.log(playerLinks);
    await this.close();
}
    async getPlayerInfo(playerUrl){
        await this.init();
        await this.openWebPage(playerUrl);
        const playerData = await this.page.evaluate(()=>{
            const name = document.querySelector('[data-first_name]').innerText;
            const lastName = document.querySelector('[data-last_name]').innerText;
            const dateOfBirth = document.querySelector('[data-date_of_birth]').innerText
            const nationality = document.querySelector('[data-country_of_birth]').innerText

        })
    }
}
    export default JugadorScraper;