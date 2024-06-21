import puppeteer from "puppeteer";

async function openWebPage(){
    const browser = await puppeteer.launch({
    headless: false
    });
    const page = await browser.newPage();

    await page.goto("https://int.soccerway.com/national/argentina/primera-division/2024/2nd-phase/r80132/venues/");

    try{
        await page.waitForSelector('button#onetrust-reject-all-handler');
    await page.click('button#onetrust-reject-all-handler');
    } catch(error){
        console.log('La página no se cargó o no se encontró el selector')
    }
    

    const result = await page.evaluate(()=> {
        const lista = document.querySelectorAll('.right');
        const nombres = [...lista].map(e => e.querySelector('h4 > a').innerText);
        const capacidad = [...lista].map(e => e.querySelector('.details > dd:nth-child(4)').innerText);
        console.log([nombres])
        return{
            nombres,
            capacidad
        }
    })
    console.log(result);
    await browser.close();
}

openWebPage();


// const elems = [...document.querySelectorAll('.right > h4 > a')]
// const text = elems.map(e => e.innerText)
// console.log(text)