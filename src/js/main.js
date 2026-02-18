import { obtenerDatosClima } from "./utils/weatherService.js";
import { actualizarClima, procesarLugaresPorClima, mostrarSkeletons } from "./utils/dom.js";
import { sanitizarInput } from "./utils/helpers.js";
import { obtenerLugaresPorClima } from "./utils/placesService.js";
import { inicializarFavoritos } from "./utils/favorite.js";
import { saveRecentSearch, renderRecentSearches } from "./utils/recentSearches.js";
import { inicializarAutoComplete, hideSuggestions } from "./utils/autoComplete.js";
import { mostrarToast } from "./utils/toast.js";

let ultimaBusquedaExitosa = "";

function gestionarBusqueda(ciudad, coordenadas = false) {
    hideSuggestions();
    mostrarSkeletons();
    obtenerDatosClima(ciudad, coordenadas).then((datos) => {
        if (!(datos instanceof Error) && datos != null) {
            ultimaBusquedaExitosa = datos.weather.name;
            saveRecentSearch(datos.weather.name);
            document.getElementById("formPrincipal")["Ciudad"].value = "";
            actualizarClima(datos);

            obtenerLugaresPorClima(datos.weather).then(async (lugares) => {
                if (!(lugares instanceof Error) && lugares != null) {
                    await procesarLugaresPorClima(lugares);
                }
            });
        } else {
            if (ultimaBusquedaExitosa && ciudad !== ultimaBusquedaExitosa) {
                mostrarToast(`Volviendo a ${ultimaBusquedaExitosa}...`, "info");
                gestionarBusqueda(ultimaBusquedaExitosa);
            }
        }
    });
}

function inicializarEventos() {
    const formPrincipal = document.getElementById("formPrincipal");
    formPrincipal.addEventListener("submit", (event) => {
        event.preventDefault();
        const ciudad = sanitizarInput(formPrincipal["Ciudad"].value);

        if (ciudad === "") {
            mostrarToast("Por favor ingrese un nombre de ciudad valido", "advertencia");
            return;
        }
        gestionarBusqueda(ciudad);
    });

    const btnGeo = document.getElementById("location-btn");
    if (btnGeo) {
        btnGeo.addEventListener("click", () => {
            if (!navigator.geolocation) {
                mostrarToast("No se puede obtener la geolocalizacion", "error");
                return;
            }
            mostrarToast("Obteniendo ubicacion...", "info");
            navigator.geolocation.getCurrentPosition((position) => {
                const peticion = `${position.coords.latitude},${position.coords.longitude}`;
                gestionarBusqueda(peticion, true);
            }, () => mostrarToast("No se pudo obtener la geolocalizacion", "error"));
        });
    }

    inicializarAutoComplete(gestionarBusqueda);
    inicializarFavoritos(gestionarBusqueda);

    const inputBusqueda = document.getElementById("inputBusqueda");
    const listaAutoCompletado = document.getElementById("listaAutoCompletado");

    inputBusqueda.addEventListener("focus", () => {
        if (inputBusqueda.value.trim() === "") {
            renderRecentSearches(listaAutoCompletado, (term) => {
                gestionarBusqueda(term);
            });
        }
    });

    document.addEventListener("click", (e) => {
        if (!inputBusqueda.contains(e.target) && !listaAutoCompletado.contains(e.target)) {
            listaAutoCompletado.classList.add('opacity-0', 'invisible');
            listaAutoCompletado.classList.remove('opacity-100', 'visible');
        }
    });
}

function primeraBusqueda() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(res => res.json())
        .then(data => gestionarBusqueda(data.city))
        .catch(err => {
            console.error('Error IP:', err);
            mostrarToast("No se pudo obtener la ubicación, mostrando Hermosillo por defecto.", "advertencia");
            gestionarBusqueda("Hermosillo");
        });
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarEventos();
    primeraBusqueda();
});

