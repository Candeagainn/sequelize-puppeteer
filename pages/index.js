import EstadioScraper from "./estadio.js";
import JugadorScraper from "./jugador.js";
import EntrenadorScraper from "./entrenador.js";
import EquipoScraper from "./equipo.js";
import PartidoScraper from "./partido.js";
import { insertCoachData, insertTeamData, insertPlayerData, insertVenueData, insertMatchData, getMatchId, insertGoalData, insertCardData} from "../dboperations.js";

async function main() {


    // /// Obtención y guardado de datos de la tabla entrenador
    //     const coachScraper = new EntrenadorScraper();
    //     const coachInfo = await coachScraper.scrapeAndSaveCoach('https://int.soccerway.com/teams/argentina/ca-belgrano-de-cordoba/114/squad/');
    //     if (coachInfo) {
    //         await insertCoachData(coachInfo.name, coachInfo.lastName, coachInfo.dateOfBirth, coachInfo.nationality);  
    //     }  

    // /// Obtención y guardado de datos de la tabla equipo
    //     const teamsSCraper = new EquipoScraper;
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
    // const stadiumScraper = new EstadioScraper();
    // const stadiums = await stadiumScraper.scrapeStadiums();
    // if (stadiums) {
    //     for (const stadium of stadiums) {
    //         await insertVenueData (stadium.nombre, stadium.ciudad, stadium.capacidad);
    //     }
    // }

    //Obtención y guardado de datos de la tabla partido
    const matchScraper = new PartidoScraper();
    const matches = await matchScraper.scrapeAndSaveMatches('https://el.soccerway.com/teams/argentina/ca-belgrano-de-cordoba/114/matches/');
    console.log(matches)
    if (matches) {
        for (const match of matches) {
            // await insertMatchData(
            //     match.fecha,
            //     match.nombreEstadio,
            //     match.nombreLocal,
            //     match.nombreVisitante, 
            //     match.localScore, 
            //     match.visitanteScore, 
            //     match.competicion);
            
            let partidoId = await getMatchId(
                match.fecha,
                match.nombreLocal,
                match.nombreVisitante);

                if (partidoId) {
                    for (const goal of match.goals) {
                        await insertGoalData(
                            partidoId,
                            goal.minGol,
                            match.nombreLocal,
                            goal.scorer,
                            goal.assist_scorer
                        );
                    }
                    // for (const card of match.cards) {
                    //     await insertCardData(
                    //         partidoId,
                    //         card.minute,
                    //         match.nombreLocal,
                    //         card.playerName,
                    //         card.cardType
                    //     )
                    // }
                } else {
                    console.log('No se encontró el ID del partido');
                }
         }
    
      }
}

main();
console.log('otra cosa');