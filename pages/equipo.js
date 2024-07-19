import BaseScraper from "../scraper.js";

class equipoScraper extends BaseScraper{
    constructor(){
        super();
    }

    async scrapeLinks(Url){
        await this.init();
        await this.openWebPage(Url)
        const linksEquipos = await this.page.evaluate(()=>{
            const links = document.querySelectorAll('table[data-round_id="80132"] > tbody > tr > .large-link > a')
            return [...links].map(e => e.getAttribute('href'));
        })
        return linksEquipos;

    }
    async getTeamInfo(teamUrl){
        await this.page.goto(teamUrl);
        const teamData = await this.page.evaluate(()=>{
            const nombre = document.querySelector('#subheading > h1').innerText;
            const ciudad = document.querySelector('.details > dd:nth-child(4)').innerText;
            return{
                nombre,
                ciudad
            }
        }); return teamData;
    }
    async scrapeAndSaveTeams(Url){
        const teamsArray = [];
        const linkList = await this.scrapeLinks(Url);
            for (const link of linkList) {
                try{ 
                    const teamDetails = await this.getTeamInfo(`https://int.soccerway.com${link}`);
                    teamsArray.push(teamDetails);
                    console.log(teamDetails);

                } catch (error) {
                    console.log('La página del equipo no pudo ser cargada', error)
                }

            } await this.close();
            return teamsArray;
    } 


} export default equipoScraper;