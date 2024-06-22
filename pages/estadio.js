
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
            const nombres = [...lista].map(e => e.querySelector('h4 > a').innerText);
            const capacidad = [...lista].map(e => e.querySelector('.details > dd:nth-child(4)').innerText);

            return{
            nombres,
            capacidad
            }

        });
        await this.close();
        return result;
    }
}

export default EstadioScraper;
    
    

//     const result = await page.evaluate(()=> {
//         const lista = document.querySelectorAll('.right');
//         const nombres = [...lista].map(e => e.querySelector('h4 > a').innerText);
//         const capacidad = [...lista].map(e => e.querySelector('.details > dd:nth-child(4)').innerText);
//         console.log([nombres])
//         return{
//             nombres,
//             capacidad
//         }
//     })
//     console.log(result);
//     await browser.close();
// }

// openWebPage();
