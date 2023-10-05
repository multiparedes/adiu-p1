async function getDriversNationailty() {
    const loader = document.getElementById('container-pie-drivers-loader')
    loader.style.display = 'flex'

    try {
        const response = await fetch('https://ergast.com/api/f1/current/drivers.json?limit=1000');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const drivers = data.MRData.DriverTable.Drivers;

        // Reducir los datos para contar la cantidad de conductores por nacionalidad
        const nationalityCounts = drivers.reduce((counts, driver) => {
            const nationality = driver.nationality;
            counts[nationality] = (counts[nationality] || 0) + 1;
            return counts;
        }, {});
        loader.style.display = 'none'

            return Object.entries(nationalityCounts).map(([name, y]) => ({ name, y }));

    } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error:', error);
        return [];
    }
}

export { getDriversNationailty };
