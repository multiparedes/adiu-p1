// Importa la función
import { getDriversNationailty } from "./js/driversNationality.js";
import { getDriversWins } from "./js/driversWin.js";
import { getDriversEvolution } from "./js/driversEvolution.js";

const pageLoader = document.getElementById('full-page-loader')
pageLoader.style.opacity = '100'

document.addEventListener('DOMContentLoaded', async function () {
    // Obtén una referencia al elemento del skeleton loader
    const [drivers, wins, evolution] = await Promise.all([getDriversNationailty(), getDriversWins(), getDriversEvolution()]);
    // Usar los colores en tu serie de datos
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
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                'Número: <b>{point.z}</b><br/>'
        },
        series: [{
            minPointSize: 10,
            innerSize: '20%',
            zMin: 0,
            data: drivers,
        }]
    });

    // Gráfico de barras para las victorias de los conductores
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
                text: 'Victorias'
            }
        },
        legend: {
            enabled: true
        },
        tooltip: {
            pointFormat: 'Victorias: <b>{point.y}</b>'
        },
        series: [{
            name: 'Victorias',
            colorByPoint: true,
            data: wins,
            dataLabels: {
                enabled: true,
                align: 'center',
                format: '{point.y}', // Sin decimales
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
            categories: evolution.dates.map(item => item.date), // Asegúrate de que categories coincida con las fechas
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
                // Acceder a la fecha y otros datos
                var date = this.key;
                var seriesName = this.series.name;
                var carrera = '';

                // Buscar la carrera correspondiente en evolution.dates
                var dateIndex = evolution.dates.findIndex(item => item.date === date);
                if (dateIndex !== -1) {
                    carrera = evolution.dates[dateIndex].race;
                }

                // Personalizar el contenido del tooltip
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


    Array.from(document.querySelectorAll('.highcharts-credits')).map((item) => {
        item.style.display = 'none';
    });

    pageLoader.style.opacity = '0'
    await setTimeout(function () {
        pageLoader.style.display = 'none'
    }, 500); // Ejemplo: 1000 milisegundos (1 segundo)
});