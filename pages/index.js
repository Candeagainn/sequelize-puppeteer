import EstadioScraper from "./estadio.js";
import JugadorScraper from "./jugador.js";
import EntrenadorScraper from "./entrenador.js";
import equipoScraper from "./equipo.js";

import { insertCoachData } from "../dboperations.js";

async function main() {
    // const stadiumScraper = new EstadioScraper();
    // const stadiums = await stadiumScraper.scrapeStadiums();
    // console.log(stadiums);

    /// Obtención y guardado de datos de la tabla jugador
// const playerScraper = new JugadorScraper();
//     // const players = await playerScraper.getLinks();
//     const playerInfo = await playerScraper.scrapeAndSavePlayers('https://int.soccerway.com/teams/argentina/ca-belgrano-de-cordoba/114/squad/')
//     console.log(playerInfo);


// /// Obtención y guardado de datos de la tabla entrenador
//     const coachScraper = new EntrenadorScraper();
//     const coachInfo = await coachScraper.scrapeAndSaveCoach('https://int.soccerway.com/teams/argentina/ca-belgrano-de-cordoba/114/squad/');
//     if (coachInfo) {
//         await insertCoachData(coachInfo.name, coachInfo.lastName, coachInfo.dateOfBirth, coachInfo.nationality);  
//     }  

// }
    const teamsSCraper = new equipoScraper;


main();
console.log('otra cosa')