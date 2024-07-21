import BaseScraper from "../scraper.js"

class JugadorScraper extends BaseScraper {
    constructor(){
        super();
    }

    async getLinks(teamUrl){
        await this.init();
        await this.openWebPage(teamUrl);
        
        const teamName = await this.page.evaluate(() => {
            const name = document.querySelector('#subheading > h1').innerText;
            return name;
        })

        const playerLinks = await this.page.evaluate(() => {
            const links = document.querySelectorAll('.name.large-link a')
            return [...links].map(e => e.getAttribute('href'));
            
    })
    console.log(playerLinks);
    return {teamName, playerLinks};
}

    async getPlayerInfo(playerUrl){
        await this.page.goto(playerUrl);
        const playerData = await this.page.evaluate(()=>{
            const name = document.querySelector('[data-first_name]').innerText;
            const lastName = document.querySelector('[data-last_name]').innerText;
            const dateOfBirth = document.querySelector('[data-date_of_birth]').innerText;
            const nationality = document.querySelector('[data-country_of_birth]').innerText;
            const position = document.querySelector('[data-position]').innerText;

            return{
                name,
                lastName,
                dateOfBirth,
                nationality,
                position
            }
        });
        return playerData;
    }

    async scrapeAndSavePlayers(teamUrl){
        const playersArray = [];

        const {teamName, playerLinks} = await this.getLinks(teamUrl);
            for (const link of playerLinks) {
                try {
                const playerInfo = await this.getPlayerInfo(`https://int.soccerway.com${link}`)
                    playersArray.push({playerInfo, teamName});
                console.log(playerInfo, teamName);
                }
                catch (error) {
                    
                    console.log ('La página no pudo cargar la info del jugador' + link)
                }  
            } 
            await this.close();
            return playersArray;
    
    } 

}

    export default JugadorScraper;