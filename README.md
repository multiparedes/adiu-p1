# ADIU - Práctica 1
## Martí Paredes Salom y Lluís Picornell Company

![FormulaAPI Dashboard](preview.png)

## Introducción

En esta primera práctica de ADIU (Aplicaciones distrubuidas y interficies de usuario) se nos ha pedido hacer un panel de datos (Data Dashboard), mediante la elección de una base de datos. Nuestro dashboard está centrado en la visualización de estadísticas de Formula 1, para ello hemos usado nuestra própia base de datos y una API externa para información extra, 
además de incluir un amplio histórico, la API se llama [Ergast](https://ergast.com/mrd/).

Los requisitos mínimos eran los siguientes:

- La parte superior del tablero debe tener una barra de navegación que contenga un vínculo con una clase navbar-brand para el título del dashboard y un atributo href igual a "#", un vínculo al sitio web de la UIB y otro vínculo a la fuente de datos. 
- Mínimo tres visualizaciones con Highcharts y/o highmaps.

Hemos diseñado cinco visualizaciones de datos para ofrecer una representación detallada de la información:

- Gráfico circular de nacionalidades: Proporciona una visión global de las nacionalidades de los pilotos. Al posicionar el cursor sobre el gráfico, se revela una lista detallada de los pilotos asociados a cada nacionalidad.
- Número de Carreras Ganadas por Piloto: Ofrece una perspectiva clara sobre el rendimiento de cada piloto en términos de victorias.
- Gráfico de Líneas con Evolución de Cada Piloto por Carrera: Permite seguir la trayectoria y el rendimiento de cada piloto a lo largo de las distintas carreras.
- Gráfico Circular con el Número de Carreras por Continente desde el Año 2000: Muestra de manera visual la distribución geográfica de las carreras desde el año 2000.
- Gráfico de Barras con el Número de Apariciones de Cada Circuito desde el Año 2000: Ilustra la frecuencia de aparición de cada circuito a lo largo del tiempo, ofreciendo insights sobre la importancia y la continuidad de los diferentes lugares de celebración de carreras.

## Implementación técnica

### Front-end

Para el desarrollo del front-end, hemos optado por utilizar HTML para la creación de la página, incorporando también Tailwind, un framework de clases de utilidad que comparte similitudes con Bootstrap para la gestión del CSS. En cuanto a la dinámica de la página, hemos implementado JavaScript para la carga eficiente de datos y la generación de gráficos interactivos.

Nuestra página es completamente adaptable, garantizando una experiencia de usuario óptima en diversos dispositivos, desde ordenadores de escritorio hasta dispositivos móviles, donde en los dispósitivos mas pequeños los elementos que ocupan mucho espacio son eliminados, como la leyenda de la evolución de los pilotos.

Aprovechando la disponibilidad de la API de Ergast, hemos logrado recopilar información histórica sobre diversas temporadas. Implementamos un selector que permite acceder a datos específicos de un año determinado, con la temporada actual cargada de manera predeterminada para facilitar la experiencia del usuario.

Los tres primeros graficos han sido creados con información extraida de Ergast mientras que las dos últimas han sido creadas con información de nuestra base de datos creada con PhpMyAdmin.

### Estructura de carpetas

La estructura de carpetas de nuestro proyecto se organiza de la siguiente manera:

```
├── assets
├── js
├── modules
├── xampp
├── main.js
└── index.html
````

- **Assets**: Carpeta donde incluimos todas las imagenes que vamos a usar, algunas de ellas són el icono de Globo usada en el navbar o el icono usado en la pestaña.

- **JS**: Aquí se encuentran todos los archivos relacionados con JavaScript. Cada archivo corresponde a una llamada a la API, junto con el tratamiento de datos para lograr la estructura deseada.

- **Modules**: Contiene todo lo necesario para cargar la libreria de Highcharts además de los modulos extra que usamos, como highcharts-pie y highcharts-accesibility.

- **Xampp**: Esta carpeta contiene archivos PHP que se utilizan para realizar llamadas a nuestra base de datos. También incluye un archivo de texto con todos los inserts necesarios para replicar la base de datos con la información actual.

- **index.html**: Único archivo html de nuestro proyecto, hace la función de raiz.

- **main.js**: Es el archivo principal de JavaScript, que llama a los diferentes archivos dentro de la carpeta js para realizar las llamadas, construir gráficos interactivos, detectar cambios en el HTML, entre otras funciones.

### Back-end
Para el back-end hemos utilizado xampp para la base de datos y php para acceder a esta.
La base de datos contiene todas las carreras de f1 desde el año 2000 con el nombre del circuito, la fecha y el continente en el que se corrió.
Para acceder a la base de datos conectamos con un connect haemos la consulta sql y devolvemos los datos. 

### Lighthouse

Para finalizar la práctica, sometimos nuestra página web a la herramienta Lighthouse, la cual evalúa y proporciona métricas sobre el rendimiento, accesibilidad, buenas prácticas y SEO. Los resultados de la evaluación son esenciales para garantizar un sitio web eficiente y centrado en la experiencia del usuario.

![Lighthouse Results](lighthouse.png)


Como se evidencia en los resultados, la sección de rendimiento es la peor de todos. Esto era previsible dado que hemos estado dependiendo de una API externa sobre la cual no tenemos control directo para mejorar o alterar las respuestas con el fin de optimizar los tiempos de ejecución.

En contraste, es gratificante notar que en los demás aspectos evaluados, hemos obtenido una puntuación perfecta. Este logro destaca nuestra dedicación a garantizar una experiencia de usuario excepcional, cumpliendo con los estándares de accesibilidad, buenas prácticas y optimización para motores de búsqueda. 

En conclusion en esta práctica hemos aprendido a utilizar la biblioteca lighthouse, también a utilizar mejor html y javascript. Ha sido una práctica ligera en la que hemos consolidado nuestros conocimientos.