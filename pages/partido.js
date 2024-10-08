import { INTEGER } from "sequelize";
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

            let competicion = document.querySelector('.details > a:nth-child(3)').innerText;


            let goals = [];
            let goalElements = nombreLocal == 'CA Belgrano'
                ? document.querySelectorAll('.scorer-info > li > span:nth-child(1) > a')
                : document.querySelectorAll('.scorer-info > li > span:nth-child(3) > a')
            
            let nombreEquipo = nombreLocal == 'CA Belgrano' ? nombreLocal : nombreVisitante;

            let minGol = '';
            let tiempo = ''
            let scorer = '';
            let assist_scorer = '';

            goalElements.forEach(element => {

                try {
                    minTexto = (element.closest('span').querySelector('.minute').innerText)
                    if (minTexto.includes('+')) {
                        const [base, extra] = minTexto.split('+');
                        minGol = parseInt(base) + parseInt(extra);
                        tiempo = parseInt(base) == 45 ? 'PT' : 'ST';
                    } else {
                        minGol = parseInt(minTexto);
                        tiempo = minGol <= 45 ? 'PT' : 'ST';
                    }
                } catch (error) { console.log('No se encontró info del minuto del gol') }
                try {
                    scorer = element.innerText
                } catch (error) { console.log('No se encontró info del goleador') }
                try {
                    assist_scorer = element.closest('span').querySelector('.assist > a').innerText
                } catch (error) { console.log('No se encontró info del asistente del gol') }

                goals.push({
                    minGol, tiempo, scorer, assist_scorer, nombreEquipo
                })
            })




            let cards = [];
            let rows = nombreLocal == 'CA Belgrano'
                ? document.querySelectorAll('.container.left .playerstats >tbody > tr')
                : document.querySelectorAll('.container.right .playerstats >tbody > tr')

            nombreEquipo = nombreLocal == 'CA Belgrano' ? nombreLocal : nombreVisitante;

            console.log(`Encontradas ${rows.length} filas`); // Depuración: Número de filas encontradas


            let playerName = '';

            rows.forEach(row => {
                let playerElement = row.querySelector('.player > a');
                if (playerElement) {
                    playerName = playerElement.innerText;
                    console.log(`Jugador encontrado: ${playerName}`);

                } else {
                    console.log('No se encontró el elemento .player > a');
                }

                let cardElements = row.querySelectorAll('.bookings > span')

                cardElements.forEach(cardElement => {
                if (cardElement) {
                    let cardType = ''
                    let minute = ''

                    if (cardElement.querySelector('img[src*="YC.png"]')) {
                        cardType = 'amarilla';
                    } else if (cardElement.querySelector('img[src*="Y2C.png"]')) {
                        cardType = '2amarilla';
                    } else if (cardElement.querySelector('img[src*="RC.png"]')) {
                        cardType = 'roja';
                    }

                
                    if (cardType) {
                        minute = cardElement.textContent.trim();
                        
                        if (minute.includes('+')) {
                            const [base, extra] = minute.split('+');
                            minTarjeta = parseInt(base) + parseInt(extra);
                            tiempo = parseInt(base) == 45 ? 'PT' : 'ST';
                        } else {
                            minTarjeta = parseInt(minute);
                            tiempo = minTarjeta <= 45 ? 'PT' : 'ST';
                        }


                        cards.push({
                            playerName,
                            cardType,
                            minTarjeta,
                            tiempo,
                            nombreEquipo
                        });
                    }
                } else {
                    console.log('...No se encontró el elemento .bookings span');
                }
            });
        });


            return {
                fecha,
                nombreEstadio,
                nombreLocal,
                nombreVisitante,
                localScore,
                visitanteScore,
                competicion,
                goals,
                cards

            }
        }); return matchInfo;
    }



    async scrapeAndSaveMatches(Url) {
        const matchesArray = [];
        const linkList = await this.getLinks(Url);
        for (const link of linkList) {
            try {
                const matchDetails = await this.getMatchInfo(`https://el.soccerway.com${link}`);
                matchesArray.push(matchDetails);
                console.log(matchDetails);
            } catch (error) {
                console.log('La página del partido no pudo ser cargada', error)
            }
        }
        await this.close();
        return matchesArray;
    }



    
}
export default PartidoScraper;