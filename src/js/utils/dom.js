import { obtenerNombreDia, obtenerDatosLugar, obtenerIconoMaterial, obtenerURLImagen, obtenerLinkMapa } from "./helpers.js";
import { cambiarIconoClima } from "./iconosClima.js";
import { volarAPosicion } from "./map.js";
import { obtenerSiEsFavorito, asignarOEliminarFavorito } from "./favorite.js";

const diccionarioId = {
    ciudad: document.getElementById('ciudad'),
    estado: document.getElementById('estado'),
    pais: document.getElementById('pais'),
    temp: document.getElementById('temperatura'),
    cond: document.getElementById('condicion'),
    hum: document.getElementById('humedad'),
    viento: document.getElementById('viento'),
    lat: document.getElementById('latitud'),
    lon: document.getElementById('longitud'),
    horaLocal: document.getElementById('horaLocal'),
    imagenClima: document.getElementById('imagenClima'),
    contenedorLugares: document.getElementById('lugares'),
    contenedorHoras: document.getElementById('pronosticoHoras'),
    contenedorDias: document.getElementById('pronosticoDias')
};



export function actualizarBoton(estado) {
    // const boton = document.getElementById("botonSubmit");
    // if (estado) {
    //     boton.classList.add("btn-disabled");
    // } else {
    //     boton.classList.remove("btn-disabled");
    // }
}

export function mostrarSkeletons() {
    const elements = [
        diccionarioId.ciudad,
        diccionarioId.pais,
        diccionarioId.temp,
        diccionarioId.cond,
        diccionarioId.hum,
        diccionarioId.viento,
        diccionarioId.horaLocal,
        diccionarioId.lat,
        diccionarioId.lon
    ];

    elements.forEach(el => {
        if (el) {
            el.textContent = "";
            el.classList.add("skeleton", "text-transparent", "bg-gray-300", "h-8", "w-24", "rounded", "inline-block");
            if (el === diccionarioId.temp) {
                el.classList.remove("h-8", "w-24");
                el.classList.add("h-20", "w-48");
            }
        }
    });

    if (diccionarioId.imagenClima) {
        diccionarioId.imagenClima.innerHTML = "";
        diccionarioId.imagenClima.classList.add("skeleton", "bg-gray-300", "rounded-full", "animate-pulse");
    }

    if (diccionarioId.contenedorHoras) {
        diccionarioId.contenedorHoras.innerHTML = Array(7).fill(0).map(() => `
            <div class="flex flex-col items-center p-2 gap-2">
                <div class="skeleton bg-gray-300 h-4 w-12 rounded"></div>
                <div class="skeleton bg-gray-300 h-8 w-8 rounded-full"></div>
                <div class="skeleton bg-gray-300 h-4 w-8 rounded"></div>
            </div>
        `).join('');
    }

    if (diccionarioId.contenedorDias) {
        diccionarioId.contenedorDias.innerHTML = Array(5).fill(0).map(() => `
            <div class="rounded-[3rem] p-4 flex flex-col items-center gap-2 bg-my-gray shadow-convex-sm">
                 <div class="skeleton bg-gray-300 h-4 w-12 rounded"></div>
                 <div class="skeleton bg-gray-300 h-10 w-10 rounded-full my-2"></div>
                 <div class="skeleton bg-gray-300 h-4 w-16 rounded"></div>
            </div>
        `).join('');
    }

    if (diccionarioId.contenedorLugares) {
        diccionarioId.contenedorLugares.innerHTML = Array(3).fill(0).map(() => `
            <div class="rounded-[3rem] shadow-convex flex gap-3 p-4">
                <div class="skeleton bg-gray-300 w-24 h-24 rounded-4xl shrink-0"></div>
                <div class="flex flex-col justify-center gap-2 flex-1">
                     <div class="skeleton bg-gray-300 h-4 w-20 rounded"></div>
                     <div class="skeleton bg-gray-300 h-6 w-32 rounded"></div>
                     <div class="skeleton bg-gray-300 h-4 w-24 rounded"></div>
                </div>
            </div>
         `).join('');
    }
}

export function ocultarSkeletons() {
    const elements = [
        diccionarioId.ciudad,
        diccionarioId.pais,
        diccionarioId.temp,
        diccionarioId.cond,
        diccionarioId.hum,
        diccionarioId.viento,
        diccionarioId.horaLocal,
        diccionarioId.lat,
        diccionarioId.lon
    ];

    elements.forEach(el => {
        if (el) {
            el.classList.remove("skeleton", "text-transparent", "bg-gray-300", "rounded", "h-8", "w-24", "h-20", "w-48", "inline-block");
        }
    });

    if (diccionarioId.imagenClima) {
        diccionarioId.imagenClima.classList.remove("skeleton", "bg-gray-300", "rounded-full", "animate-pulse");
    }
}

export function actualizarClima(data) {
    ocultarSkeletons();
    if (data instanceof Error || data == null) return;

    const weather = data.weather;
    const cityInfo = data.forecast.city;

    const dt = weather.dt;
    const timezone = weather.timezone;
    console.log("timezone", timezone);
    console.log("dt", dt);

    const fechaLocal = new Date((Math.abs(dt) + timezone) * 1000);

    if (!weather || !cityInfo) return;

    diccionarioId.ciudad.textContent = weather.name;
    diccionarioId.pais.textContent = weather.sys.country;

    if (diccionarioId.estado) diccionarioId.estado.textContent = "";

    if (diccionarioId.lat) diccionarioId.lat.textContent = weather.coord.lat;
    if (diccionarioId.lon) diccionarioId.lon.textContent = weather.coord.lon;

    const horas = String(fechaLocal.getUTCHours()).padStart(2, '0');
    const minutos = String(fechaLocal.getUTCMinutes()).padStart(2, '0');

    diccionarioId.horaLocal.textContent = `${horas}:${minutos}`;

    cambiarIconoClima(weather.weather[0].id, fechaLocal.getUTCHours() * 100 + fechaLocal.getUTCMinutes());

    diccionarioId.temp.textContent = Math.round(weather.main.temp) + "°C";
    diccionarioId.cond.textContent = weather.weather[0].description;
    diccionarioId.hum.textContent = weather.main.humidity + "%";
    diccionarioId.viento.textContent = (weather.wind.speed * 3.6).toFixed(1) + " km/h";

    obtenerSiEsFavorito(weather.name);

    document.getElementById("favorite-btn").onclick = () => {
        asignarOEliminarFavorito(weather.name);
    };

    procesarPronosticoPorHoras(data.forecast.list, timezone);
    procesarPronosticoPorDias(data.forecast.list);
    volarAPosicion(weather.coord.lat, weather.coord.lon);
}

function procesarPronosticoPorHoras(listaPronostico, timezone) {
    const contenedor = diccionarioId.contenedorHoras;
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const now = new Date();
    const desplazamientoPC = now.getTimezoneOffset() * 60000;
    const desplazamientoDestino = timezone * 1000;

    const proximos7Pronosticos = listaPronostico.slice(0, 7);

    const template = document.getElementById("cardPrevision");

    proximos7Pronosticos.forEach(item => {
        const clone = template.content.cloneNode(true);

        const fechaItem = new Date((item.dt * 1000) + desplazamientoPC + desplazamientoDestino);

        const horaLegible = fechaItem.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const temp = Math.round(item.main.temp);
        const lluvia = Math.round(item.pop * 100);
        const iconoMaterial = obtenerIconoMaterial(item.weather[0].id);

        clone.querySelector(".hora").textContent = horaLegible;
        clone.querySelector(".temperatura").textContent = temp + "°C";
        clone.querySelector(".probabilidad").textContent = lluvia + "%";

        const iconoElement = clone.querySelector(".icono");
        if (iconoElement) {
            iconoElement.textContent = iconoMaterial[0];
            iconoElement.style.color = iconoMaterial[1];
        }

        contenedor.appendChild(clone);
    });
}

export async function procesarLugaresPorClima(listaLugares) {
    const contenedor = diccionarioId.contenedorLugares;
    if (!contenedor) return;

    const lugaresProcesados = listaLugares.features.map(lugar => obtenerDatosLugar(lugar));

    contenedor.innerHTML = "";

    const template = document.getElementById("cardLugar");

    lugaresProcesados.forEach(lugar => {
        if (lugar) {
            console.log(lugar);
            const clone = template.content.cloneNode(true);

            clone.querySelector(".imagenLugar").src = obtenerURLImagen(lugar.coordenadas[1], lugar.coordenadas[0]);
            clone.querySelector(".nombreLugar").textContent = lugar.titulo;
            clone.querySelector(".direccionLugar").textContent = lugar.direccion;
            clone.querySelector(".linkLugar").href = obtenerLinkMapa(lugar.coordenadas[1], lugar.coordenadas[0]);

            contenedor.appendChild(clone);
        }
    });
}

export function procesarPronosticoPorDias(listaPronostico) {
    const contenedor = diccionarioId.contenedorDias;
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const diasAgrupados = {};

    listaPronostico.forEach(item => {
        const fecha = item.dt_txt.split(' ')[0];

        if (!diasAgrupados[fecha]) {
            diasAgrupados[fecha] = {
                temp_min: item.main.temp_min,
                temp_max: item.main.temp_max,
                pop_max: item.pop,
                icon: item.weather[0].icon,
                description: item.weather[0].description,
                fechaTxt: item.dt_txt
            };
        } else {
            diasAgrupados[fecha].temp_min = Math.min(diasAgrupados[fecha].temp_min, item.main.temp_min);
            diasAgrupados[fecha].temp_max = Math.max(diasAgrupados[fecha].temp_max, item.main.temp_max);
            diasAgrupados[fecha].pop_max = Math.max(diasAgrupados[fecha].pop_max, item.pop);

            if (item.dt_txt.includes("12:00:00")) {
                diasAgrupados[fecha].icon = item.weather[0].icon;
                diasAgrupados[fecha].description = item.weather[0].description;
            }
        }
    });

    const clavesDias = Object.keys(diasAgrupados).slice(0, 5);

    const template = document.getElementById("cardPronostico");

    clavesDias.forEach(fecha => {
        const clone = template.content.cloneNode(true);
        const diaData = diasAgrupados[fecha];
        const nombreDia = obtenerNombreDia(diaData.fechaTxt);
        const max = Math.round(diaData.temp_max);
        const min = Math.round(diaData.temp_min);
        const lluvia = Math.round(diaData.pop_max * 100);

        const iconoMaterial = obtenerIconoMaterial(diaData.icon);

        clone.querySelector(".dia").textContent = nombreDia;
        clone.querySelector(".icono").textContent = iconoMaterial[0];
        clone.querySelector(".icono").style.color = iconoMaterial[1];
        clone.querySelector(".tempMax").textContent = max + "°C";
        clone.querySelector(".tempMin").textContent = min + "°C";
        clone.querySelector(".probabilidad").textContent = lluvia + "%";

        contenedor.appendChild(clone);
    });
}

