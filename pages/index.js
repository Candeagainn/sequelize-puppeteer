import EstadioScraper from "./estadio.js";
import JugadorScraper from "./jugador.js";

async function main() {
    // const stadiumScraper = new EstadioScraper();
    // const stadiums = await stadiumScraper.scrapeStadiums();
    // console.log(stadiums);
const playerScraper = new JugadorScraper();
    // const players = await playerScraper.getLinks();
    const playerInfo = await playerScraper.scrapeAndSavePlayers('https://int.soccerway.com/teams/england/norwich-city-fc/677/squad/')
    console.log(playerInfo);

}

main();
console.log('otra cosa')