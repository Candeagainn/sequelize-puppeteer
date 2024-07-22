
import BaseScraper from '../scraper.js';

// class Estadio {
//     constructor(nombre, capacidad) {
//         this.nombre = nombre;
//         this.capacidad = capacidad;
//     }
// }


class EstadioScraper extends BaseScraper {
    constructor() {
        super();
    }

    async scrapeStadiums() {
        await this.init();
        await this.openWebPage("https://int.soccerway.com/national/argentina/primera-division/2024/2nd-phase/r80132/venues/");
        const result = await this.page.evaluate(() => {
            const lista = document.querySelectorAll('.right');
            const estadios = [...lista].map(e => {
                const nombre = e.querySelector('h4 > a').innerText;
                const ciudad = e.querySelector('.details > dd:nth-child(2)').innerText;
                const capacidad = e.querySelector('.details > dd:nth-child(4)').innerText;

                return {
                    nombre,
                    ciudad,
                    capacidad
                }
            }) 
            return estadios;
        });
        await this.close();
        return result;
    }
}

export default EstadioScraper;
