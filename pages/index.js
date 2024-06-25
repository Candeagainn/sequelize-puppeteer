import EstadioScraper from "./estadio.js";
import JugadorScraper from "./jugador.js";

async function main() {
    // const stadiumScraper = new EstadioScraper();
    // const stadiums = await stadiumScraper.scrapeStadiums();
    // console.log(stadiums);
    const playerScraper = new JugadorScraper();
    const players = await playerScraper.scrapePlayers();
    console.log(players);
}

main();
console.log('otra cosa')