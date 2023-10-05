async function getDriversWins() {

    const loader = document.getElementById('container-bars-wins-loader')
    loader.style.display = 'block'
    try {
        const response = await fetch('https://ergast.com/api/f1/current/driverStandings.json?limit=1000');
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

        loader.style.display = 'none'

        return winsData;
    } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error:', error);
        return [];
    }
}

export { getDriversWins };
