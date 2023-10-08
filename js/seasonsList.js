async function getSeasonsList() {
    try {
        const response = await fetch('https://ergast.com/api/f1/seasons.json?limit=1000');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const seasons = data.MRData.SeasonTable.Seasons.map((season) => season.season)
        seasons.pop();
        

        return seasons.sort((a, b) => b - a)
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

function appendSeasonsDropdown(seasons) {
    const seasonsDropdown = document.getElementById('seasons');

    for (const season of seasons) {
        const option = document.createElement('option');
        option.value = season; 
        option.textContent = season;
        seasonsDropdown.appendChild(option);
    }

}

export { getSeasonsList,appendSeasonsDropdown };
