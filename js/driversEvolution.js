async function getDriversEvolution(season) {
    try {
        const response = await fetch('https://ergast.com/api/f1/' + season + '/results.json?limit=1000');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const drivers = {};
        const races = [];
        const dates = []

        // Itera a través de las carreras y los resultados
        data.MRData.RaceTable.Races.forEach((race) => {
            races.push(race.Circuit.circuitName ); // Agregar nombre de carrera a la lista de carreras
            dates.push({date: race.date, race: race.Circuit.circuitName} ); // Agregar nombre de carrera a la lista de carreras
            race.Results.forEach((result) => {
                const driverName = result.Driver.givenName + ' ' + result.Driver.familyName;
                const points = parseFloat(result.points); // Convierte los puntos en un número

                if (!drivers[driverName]) {
                    drivers[driverName] = {
                        name: driverName,
                        data: [],
                    };
                }

                // Suma los puntos al valor acumulado anterior
                const previousTotal = drivers[driverName].data.length > 0 ? drivers[driverName].data.slice(-1)[0] : 0;
                const newTotal = previousTotal + points;

                drivers[driverName].data.push(newTotal);
            });
        });

        const driverList = Object.values(drivers);

        const actual = parseFloat(document.getElementById('progress-bar').style.width) + 25
        document.getElementById('progress-bar').innerHTML = actual+'%'
        document.getElementById('progress-bar').style.width = actual+'%'

        return { drivers: driverList, races, dates: dates };
    } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error:', error);
        return { drivers: [], races: [], dates: [] };
    }
}

export { getDriversEvolution };
