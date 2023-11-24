async function getDriversNationailty(season) {

    try {
        const response = await fetch('https://ergast.com/api/f1/' + season + '/drivers.json?limit=1000');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const drivers = data.MRData.DriverTable.Drivers;

        // Reducir los datos para contar la cantidad de conductores por nacionalidad
        const nationalityCounts = drivers.reduce((counts, driver) => {
            const nationality = driver.nationality;
            
            // Si aún no existe la entrada para esta nacionalidad, crea un objeto con la lista de pilotos vacía
            if (!counts[nationality]) {
                counts[nationality] = {
                    count: 0,
                    drivers: [],
                };
            }
            
            // Incrementa el contador de esa nacionalidad
            counts[nationality].count++;
            
            // Agrega el nombre del piloto a la lista de pilotos de esa nacionalidad
            counts[nationality].drivers.push(driver.givenName + ' ' + driver.familyName);
            
            return counts;
        }, {});
        
        const actual = parseFloat(document.getElementById('progress-bar').style.width) + 25
        document.getElementById('progress-bar').style.width = actual+'%'
        document.getElementById('progress-bar').innerHTML = actual+'%'

        return Object.entries(nationalityCounts).map(([name, info]) => ({
            name,
            y: info.count,
            z: info.count,
            drivers: info.drivers, // Lista de nombres de pilotos
        }));

    } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error:', error);
        return [];
    }
}

export { getDriversNationailty };
