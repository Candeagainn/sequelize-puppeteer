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
            return [...links].map(e => e.getAttribute('href'));
            
    })
    console.log(playerLinks);
    return playerLinks;
}

    async getPlayerInfo(playerUrl){
        await this.page.goto(playerUrl);
        const playerData = await this.page.evaluate(()=>{
            const name = document.querySelector('[data-first_name]').innerText;
            const lastName = document.querySelector('[data-last_name]').innerText;
            const dateOfBirth = document.querySelector('[data-date_of_birth]').innerText
            const nationality = document.querySelector('[data-country_of_birth]').innerText

            return{
                name,
                lastName,
                dateOfBirth,
                nationality
            }
        });
        return playerData;
    }

    async scrapeAndSavePlayers(teamUrl){
        const playersArray = [];

        const playerLinks = await this.getLinks(teamUrl);

        for (const link of playerLinks) {
            const playerInfo = await this.getPlayerInfo(`https://int.soccerway.com${link}`)
            playersArray.push(playerInfo);
            console.log(playerInfo);
        } 
        await this.close();
        return playersArray;
    } 

}

    export default JugadorScraper;