import EstadioScraper from "./estadio.js";

async function main() {
    const scraper = new EstadioScraper();
    const stadiums = await scraper.scrapeStadiums();
    console.log(stadiums);
}

main();
console.log('otra cosa')