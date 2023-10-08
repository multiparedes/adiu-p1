import { mountHighcharts } from "./js/mountHighcharts.js";
import { appendSeasonsDropdown } from "./js/seasonsList.js";
import { getSeasonsList } from "./js/seasonsList.js";

const pageLoader = document.getElementById('full-page-loader')
pageLoader.style.opacity = '100'
pageLoader.style.display = 'grid'

let seasonsList = null

document.addEventListener('DOMContentLoaded', async function () {   
    if(!seasonsList) {
        seasonsList = await getSeasonsList()
    } 

    document.getElementById('seasons').addEventListener('change', async (event) => {
        const pageLoader = document.getElementById('full-page-loader')
        pageLoader.style.display = 'grid'
        pageLoader.style.opacity = '100'

        
        await mountHighcharts(event.target.value)

        pageLoader.style.opacity = '0'
        await setTimeout(function () {
            pageLoader.style.display = 'none'
        }, 500); 
    })

    await appendSeasonsDropdown(seasonsList)
    await mountHighcharts('current')


    pageLoader.style.opacity = '0'
    await setTimeout(function () {
        pageLoader.style.display = 'none'
    }, 500); 
});