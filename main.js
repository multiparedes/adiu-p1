// Importa la función
import { getDriversNationailty } from "./js/driversNationality.js";
import { getDriversWins } from "./js/driversWin.js";

document.addEventListener('DOMContentLoaded', async function () {


    
  // Obtén una referencia al elemento del skeleton loader
  const skeletonLoader = document.getElementById('container-pie-drivers-loader');
  // Mostrar el skeleton loader
  skeletonLoader.style.display = 'block';
    // Generar una paleta de colores
    const [drivers,wins] = await Promise.all([getDriversNationailty(), getDriversWins()]);
  // Ocultar el skeleton loader una vez que los datos se han cargado
  skeletonLoader.style.display = 'none';
    console.log(wins)

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
                'Número: <b>{point.y}</b><br/>'
        },
        series: [{
            minPointSize: 10,
            innerSize: '20%',
            zMin: 0,
            name: 'countries',
            borderRadius: 5,
            data: drivers, // Debes proporcionar tus datos formateados aquí
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
            enabled: false
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
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}', // Sin decimales
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
    
    Array.from(document.querySelectorAll('.highcharts-credits')).map((item) => {
        item.style.display = 'none';
      });
});