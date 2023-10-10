async function getDriversWins(season) {

    try {
        const response = await fetch('https://ergast.com/api/f1/' + season + '/driverStandings.json?limit=1000');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        // Formatear los datos para el gráfico de barras de Highcharts
        const winsData = standings.filter(driver => parseInt(driver.wins) > 0).map(item => ({
            name: `${item.Driver.givenName} ${item.Driver.familyName}`,
            y: parseInt(item.wins)
        })); // Filtrar conductores con victorias > 0


        const actual = parseFloat(document.getElementById('progress-bar').style.width) + 33
        document.getElementById('progress-bar').style.width = actual+'%'
        document.getElementById('progress-bar').innerHTML = actual+'%'
        return winsData;
    } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error:', error);
        return [];
    }
}

export { getDriversWins };
