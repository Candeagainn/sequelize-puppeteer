import BaseScraper from "../scraper.js";

class PartidoScraper extends BaseScraper {
    constructor(){
        super();
    }

    async getLinks(Url){
        await this.init();
        await this.openWebPage(Url)
        const linksEquipos = await this.page.evaluate(()=>{
            const links = document.querySelectorAll('.score-time.score > a')
            return [...links].map(e => e.getAttribute('href'));
            
        })
        console.log(linksEquipos);
        return linksEquipos;

    }

    async getMatchInfo(Url){
        await this.page.goto(Url);
        const matchInfo = await this.page.evaluate(()=>{

            let fecha = document.querySelector('.details > a:nth-child(1)').innerText;
            fecha = fecha.split('-')

            let nombreEstadio = document.querySelector('.details > span > a').innerText;
            nombreEstadio = nombreEstadio.replace(/\s*\(.*?\)\s*/g, '').trim();

            const imgLocal = document.querySelector('.left > a > img');
            const imgVisitante = document.querySelector('.right > a > img');

            const nombreLocal = imgLocal ? imgLocal.alt : 'Equipo Local No Disponible';
            const nombreVisitante = imgVisitante.alt

            
            return{
                fecha,
                nombreEstadio,
                nombreLocal,
                nombreVisitante
            }
        }); return matchInfo;
    } 

    async scrapeAndSaveMatches(Url){
        const matchesArray = [];
        const linkList = await this.getLinks(Url);
        for (const link of linkList) {
            try{ 
                const matchDetails = await this.getMatchInfo(`https://el.soccerway.com${link}`);
                matchesArray.push(matchDetails);
                console.log(matchDetails);
            } catch(error){
                console.log('La página del partido no pudo ser cargada', error)
            }
        }
            await this.close();
            return matchesArray;
}

}
 export default PartidoScraper;