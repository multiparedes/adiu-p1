async function getDriversEvolution() {
    try {
        const response = await fetch('https://ergast.com/api/f1/current/results.json?limit=1000');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const drivers = {};
        const races = [];

        // Itera a través de las carreras y los resultados
        data.MRData.RaceTable.Races.forEach((race) => {
            races.push(race.Circuit.circuitName ); // Agregar nombre de carrera a la lista de carreras
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


        return { drivers: driverList, races };
    } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error:', error);
        return { drivers: [], races: [] };
    }
}

export { getDriversEvolution };
