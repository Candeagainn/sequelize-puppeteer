import BaseScraper from "../scraper.js";

class PartidoScraper extends BaseScraper {
    constructor() {
        super();
    }

    async getLinks(Url) {
        await this.init();
        await this.openWebPage(Url)
        const linksPartidos = await this.page.evaluate(() => {
            const links = document.querySelectorAll('.score-time.score > a')
            return [...links].map(e => e.getAttribute('href'));

        })
        console.log(linksPartidos);
        return linksPartidos;

    }

    async getMatchInfo(Url) {
        await this.page.goto(Url);
        const matchInfo = await this.page.evaluate(() => {

            let fecha = document.querySelector('.details > a:nth-child(1)').innerText;

            const fechaParts = fecha.split('/');

            if (fechaParts.length === 3) {
                const [dia, mes, an] = fechaParts;
                fecha = `${an}-${mes}-${dia}`;
            }

            console.log('Fecha formateada:', fecha); // Depuración

            let nombreEstadio = document.querySelector('.details > span > a').innerText;
            nombreEstadio = nombreEstadio.replace(/\s*\(.*?\)\s*/g, '').trim();

            const imgLocal = document.querySelector('.left > a > img');
            const imgVisitante = document.querySelector('.right > a > img');

            const nombreLocal = imgLocal ? imgLocal.alt : 'Equipo Local No Disponible';
            const nombreVisitante = imgVisitante ? imgVisitante.alt : 'Equipo Visitante No Disponible';

            const scoreElement = document.querySelector('.bidi');

            let localScore = 0;
            let visitanteScore = 0;

            if (scoreElement) {
                const scoreText = scoreElement.textContent.trim();

                const scores = scoreText.split('-');

                if (scores.length === 2) {
                    // Extrae y convierte los puntajes a enteros
                    localScore = parseInt(scores[0].trim(), 10);
                    visitanteScore = parseInt(scores[1].trim(), 10);
                }
            }
                    return {
                        fecha,
                        nombreEstadio,
                        nombreLocal,
                        nombreVisitante,
                        localScore,
                        visitanteScore
                    }
            }); return matchInfo;
    }

    async getGoalsInfo(){
        const [events] = await this.page.evaluate(()=>{
            const teamName = 'Belgrano'

            let teamLocal = document.querySelector('.container.left > .team-title').innerText;
            if (teamName == teamLocal.innerText) {
                let goalElements = document.querySelectorAll('.scorer-info > li > span:nth-child(1) > a')
                let min = parseInt(document.querySelectorAll('.scorer-info > li > span:nth-child(1) > .minute').innerText)

            } else {
                let goalElements = document.querySelectorAll('.scorer-info > li > span:nth-child(3) > a')
                let min = parseInt(document.querySelectorAll('.scorer-info > li > span:nth-child(3) > .minute').innerText)
            }
            goalElements.forEach(element =>{
                const scorer = element.innerText.trim('.')
                const assist_scorer = element.querySelector('.assist').innerText.trim('.')
                // For the id_equipo we will use an element from another method in the class
                events.push({min, scorer, assist_scorer
                })
            }) 
            return events;
        })
        return events;
    }  
    
    async scrapeAndSaveMatches(Url) {
        const matchesArray = [];
        const linkList = await this.getLinks(Url);
        for (const link of linkList) {
            try {
                const matchDetails = await this.getMatchInfo(`https://el.soccerway.com${link}`);
                const goalDetails = await this.getGoalsInfo();
                matchesArray.push(matchDetails, goalDetails);
                console.log(matchDetails, goalDetails.toJSON());
            } catch (error) {
                console.log('La página del partido no pudo ser cargada', error)
            }
        }
        await this.close();
        return matchesArray;
    }

}
export default PartidoScraper;