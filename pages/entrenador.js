import BaseScraper from "../scraper.js";

class entrenadorScraper extends BaseScraper {
    constructor(){
        super();
    }


    async getLink(teamUrl){
        await this.init();
        await this.openWebPage(teamUrl);

        const coachLink = await this.page.evaluate(() => {
            const link = document.querySelector('#page_team_1_block_team_squad_7 > div > table:nth-child(3) > tbody > tr > td.name.large-link > a')
           return link.getAttribute('href');
    })
    console.log(coachLink);
    return coachLink;
    }

    async getCoachInfo(coachUrl){
        await this.page.goto(coachUrl);
        const coachData = await this.page.evaluate(()=>{
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
        return coachData;
    }

    async scrapeAndSaveCoach(teamUrl){
        const coachLink = await this.getLink(teamUrl);

        try{
            const coachInfo = await this.getCoachInfo(`https://int.soccerway.com${coachLink}`);
            await this.close();
            return coachInfo;
        } catch (error){
            console.log('La página no pudo cargar la info del entrenador' + coachLink)
        }
    }

}
export default entrenadorScraper;