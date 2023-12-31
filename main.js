import { appendSeasonsDropdown } from "./js/seasonsList.js";
import { getSeasonsList } from "./js/seasonsList.js";
import { getDriversNationailty } from "./js/driversNationality.js";
import { getDriversWins } from "./js/driversWin.js";
import { getDriversEvolution } from "./js/driversEvolution.js";

const pageLoader = document.getElementById('full-page-loader')
pageLoader.style.opacity = '100'
pageLoader.style.display = 'grid'


async function mountHighcharts(season) {
    document.getElementById('progress-bar').style.width = '0%'
    
    const [drivers, wins, evolution] = await Promise.all([getDriversNationailty(season), getDriversWins(season), getDriversEvolution(season)]);

    document.getElementById('container-pie-drivers').innerHTML=""
    document.getElementById('container-bars-wins').innerHTML=""
    document.getElementById('container-chart-evolution').innerHTML=""
    document.getElementById('container-continent-races').innerHTML=""
    document.getElementById('container-apearances-circuit').innerHTML=""
    const continents = await hacerPeticionAJAX_continents();
    const races = await hacerPeticionAJAX_circuits();
    var continents_map = continents.map(function (continent) {
        return {
        name: continent.location,
        y: parseInt(continent.count),
        z: parseInt(continent.count)
        };
    });
    var races_map = races.map(function (race) {
        return {
        name: race.race_name,
        y: parseInt(race.count)
        };
    });

    Highcharts.chart('container-pie-drivers', {
        chart: {
            type: 'variablepie'
        },
        title: {
            text: '',
            align: 'left'
        },
        tooltip: {
            headerFormat: '',
            formatter: function () {
                var punto = this.point;
        
                // Obtenemos la lista de nombres de pilotos para esta nacionalidad
                var pilotos = punto.drivers.join(', ');
        
                var tooltipContent = '<span style="color:' + punto.color + '">\u25CF</span> <b>' + punto.name + '</b><br/>' +
                    'Número: <b>' + punto.z + '</b><br/>' +
                    // Agregamos los nombres de pilotos relacionados con esta nacionalidad
                    'Pilotos: <b>' + pilotos + '</b><br/>';
                
                return tooltipContent;
            }
        },
        
        series: [{
            minPointSize: 10,
            innerSize: '20%',
            zMin: 0,
            data: drivers,
        }]
    });

    Highcharts.chart('container-continent-races', {
        chart: {
            type: 'variablepie'
        },
        title: {
            text: '',
            align: 'left'
        },
        tooltip: {
            headerFormat: '',
            formatter: function () {
                var punto = this.point;
                var tooltipContent = '<span style="color:' + punto.color + '">\u25CF</span> <b>' + punto.location + '</b><br/>' +
                'Número: <b>' + punto.y + '</b><br/>';
                return tooltipContent;
            }
        },
        series: [{
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        data: continents_map,
        }]
    });

    Highcharts.chart('container-bars-wins', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '',
            pointFormat: 'Victorias: <b>{point.y}</b>'
        },
        series: [{
            name: 'Victorias',
            colorByPoint: true,
            data: wins,
            dataLabels: {
                enabled: true,
                align: 'center',
                format: '{point.y}',
            }
        }]
    });


    Highcharts.chart('container-chart-evolution', {
        chart: {
            type: 'spline'
        },
        title: {
            text: '',
        },
        yAxis: {
            title: {
                text: ''
            },
        },
        xAxis: {
            categories: evolution.dates.map(item => item.date), 
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            },
            spline: {
                lineWidth: 2,
                marker: {
                    enabled: false
                },
            }
        },
        tooltip: {
            formatter: function () {
                var date = this.key;
                var seriesName = this.series.name;
                var carrera = '';

                var dateIndex = evolution.dates.findIndex(item => item.date === date);
                if (dateIndex !== -1) {
                    carrera = evolution.dates[dateIndex].race;
                }

                var tooltipContent = '<span style="color:' + this.color + '">\u25CF</span> <b>' + seriesName + '</b><br/>Puntos acumulados: ' + this.y + '<br/>Carrera: ' + carrera;

                return tooltipContent;
            }
        },
        legend: {
            enabled: true
        },
        series: evolution.drivers,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        enabled: false,
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
    Highcharts.chart('container-continent-races', {
        chart: {
            type: 'variablepie'
        },
        title: {
            text: '',
            align: 'left'
        },
        tooltip: {
        headerFormat: '',
        formatter: function () {
            var punto = this.point;
            var tooltipContent = '<span style="color:' + punto.color + '">\u25CF</span> <b>' + punto.name + '</b><br/>' +
            'Número: <b>' + punto.y + '</b><br/>';
            return tooltipContent;
        }
        },
        series: [{
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        data: continents_map,
        }]
    });

    
        Highcharts.chart('container-apearances-circuit', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '',
            pointFormat: 'Apariciones: <b>{point.y}</b>'
        },
        series: [{
            name: 'Apariciones',
            colorByPoint: true,
            data: races_map,
            dataLabels: {
                enabled: true,
                align: 'center',
                format: '{point.y}',
            }
        }]
    });
    



    Array.from(document.querySelectorAll('.highcharts-credits')).map((item) => {
        item.style.display = 'none';
    });
};

function hacerPeticionAJAX_continents() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const datos = JSON.parse(xhr.responseText);
                    resolve(datos);
                    console.log(datos);
                } else {
                    reject('Hubo un error en la solicitud.');
                }
            }
        };
            xhr.open('GET', 'xampp/select_continents.php', true);
            xhr.send();
        });
}

function hacerPeticionAJAX_circuits() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const datos = JSON.parse(xhr.responseText);
                    resolve(datos);
                    console.log(datos);
                } else {
                    reject('Hubo un error en la solicitud.');
                }
            }
        };
            xhr.open('GET', 'xampp/select_races.php', true);
            xhr.send();
        });
}


let seasonsList = null
document.addEventListener('DOMContentLoaded', async function () {   
    if(!seasonsList) {
        seasonsList = await getSeasonsList()
    } 

    document.getElementById('wins-hero').classList.add('mb-4')
    document.getElementById('continent-hero').classList.add('mb-4')

    document.getElementById('seasons').addEventListener('change', async (event) => {
        const pageLoader = document.getElementById('full-page-loader')
        document.getElementById('progress-bar').style.width = '0%'
        pageLoader.style.opacity = '0'
        pageLoader.style.display = 'grid'

        document.getElementById('wins-hero').classList.add('mb-4')
        document.getElementById('continent-hero').classList.add('mb-4')


        await setTimeout(function () {
            pageLoader.style.opacity = '100'
        }, 0); 
        
        await mountHighcharts(event.target.value)
        document.getElementById('wins-hero').classList.remove('mb-4')
        document.getElementById('continent-hero').classList.remove('mb-4')
        document.getElementById('progress-bar').style.width = '100%'
        document.getElementById('progress-bar').innerHTML = '100%'

        pageLoader.style.opacity = '0'
        await setTimeout(function () {
            pageLoader.style.display = 'none'
        }, 500); 
    })

    await appendSeasonsDropdown(seasonsList)
    await mountHighcharts('current')

    document.getElementById('wins-hero').classList.remove('mb-4')
    document.getElementById('continent-hero').classList.remove('mb-4')
    document.getElementById('progress-bar').style.width = '100%'
    document.getElementById('progress-bar').innerHTML = '100%'

    pageLoader.style.opacity = '0'
    await setTimeout(function () {
        pageLoader.style.display = 'none'
    }, 500); 
});