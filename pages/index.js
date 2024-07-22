import EstadioScraper from "./estadio.js";
import JugadorScraper from "./jugador.js";
import EntrenadorScraper from "./entrenador.js";
import equipoScraper from "./equipo.js";

import { insertCoachData, insertTeamData, insertPlayerData, insertVenueData } from "../dboperations.js";

async function main() {


    // /// Obtención y guardado de datos de la tabla entrenador
    //     const coachScraper = new EntrenadorScraper();
    //     const coachInfo = await coachScraper.scrapeAndSaveCoach('https://int.soccerway.com/teams/argentina/ca-belgrano-de-cordoba/114/squad/');
    //     if (coachInfo) {
    //         await insertCoachData(coachInfo.name, coachInfo.lastName, coachInfo.dateOfBirth, coachInfo.nationality);  
    //     }  

    // /// Obtención y guardado de datos de la tabla equipo
    //     const teamsSCraper = new equipoScraper;
    //     const teamLinks = await teamsSCraper.scrapeAndSaveTeams('https://int.soccerway.com/national/argentina/primera-division/2024/2nd-phase/r80132/tables/')
    //     console.log(teamLinks); 
    //         if (teamLinks) {
    //             for (const team of teamLinks) {
    //                 await insertTeamData(team.nombre, team.ciudad);
    //             }
    //         }


    // // Obtención y guardado de datos de la tabla jugador
    // const playerScraper = new JugadorScraper();
    // const playerDataArray = await playerScraper.scrapeAndSavePlayers('https://int.soccerway.com/teams/argentina/ca-belgrano-de-cordoba/114/squad/')
    // if (playerDataArray) {
    //     for (const player of playerDataArray) {
    //         await insertPlayerData(
    //             player.playerInfo.name,
    //             player.playerInfo.lastName,
    //             player.playerInfo.dateOfBirth,
    //             player.playerInfo.nationality,
    //             player.playerInfo.position,
    //             player.teamName);
    //     }
    // }

    // Obtención y guardado de datos de la tabla estadio
    const stadiumScraper = new EstadioScraper();
    const stadiums = await stadiumScraper.scrapeStadiums();
    if (stadiums) {
        for (const stadium of stadiums) {
            await insertVenueData
        }
    }
    }

main();
console.log('otra cosa');