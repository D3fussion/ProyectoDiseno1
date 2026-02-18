import { actualizarBoton } from "./dom.js";
import { mostrarToast } from "./toast.js";
import { delay } from "./helpers.js";

const obtenerCategoriasPorClima = (weatherId) => {
    // Referencia: https://openweathermap.org/weather-conditions

    // Grupo 2xx (Tormenta), 3xx (Llovizna), 5xx (Lluvia), 6xx (Nieve) -> Lugares Cerrados
    if (weatherId >= 200 && weatherId < 700) {
        return "entertainment.museum,entertainment.cinema,catering.cafe,commercial.shopping_mall,leisure.spa";
    }

    // Grupo 7xx (Atmósfera: Niebla, Polvo) -> Precaución / Interiores
    if (weatherId >= 700 && weatherId < 800) {
        return "catering.restaurant,catering.cafe,commercial.supermarket";
    }

    // Grupo 800 (Despejado) -> Aire Libre
    if (weatherId === 800) {
        return "tourism.sights,leisure.park,natural,entertainment.zoo,sport.stadium";
    }

    // Grupo 80x (Nubes) -> Mixto (Parques o Centros comerciales)
    if (weatherId > 800) {
        return "commercial.shopping_mall,tourism.sights,leisure.park,catering.restaurant";
    }

    // Default
    return "tourism,catering";
};

let currentRequest = {
    controller: null,
    timeoutId: null,
    slowWarningId: null
};

const retryMax = 3;

export const obtenerLugaresPorClima = async (weather) => {
    const clima = weather.weather[0].id;

    if (currentRequest.controller) {
        currentRequest.controller.abort('new_search');
        clearTimeout(currentRequest.timeoutId);
        clearTimeout(currentRequest.slowWarningId);
    }

    const lat = weather.coord.lat;
    const lon = weather.coord.lon;
    const categorias = obtenerCategoriasPorClima(clima);

    const controller = new AbortController();

    currentRequest = {
        controller: controller,
        timeoutId: setTimeout(() => controller.abort('timeout'), 10000),
        slowWarningId: setTimeout(() => mostrarToast("La petición está tardando...", "advertencia"), 5000)
    };

    mostrarToast("Cargando...", "info");
    actualizarBoton(true);

    try {
        let retryCount = 0;
        let respuesta = null;
        let lastError = null;

        while (retryCount < retryMax) {
            try {
                const ciudadEncoded = encodeURIComponent(ciudad);
                respuesta = await fetch(`/api/lugares?lat=${lat}&lon=${lon}&categorias=${categorias}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    signal: controller.signal
                });

                if (respuesta.status >= 400 && respuesta.status < 500) break;
                if (respuesta.ok) break;

                throw new Error(`Error del servidor: ${respuesta.status}`);

            } catch (fetchError) {
                if (fetchError.name === 'AbortError') throw fetchError;
                lastError = fetchError;
                retryCount++;
                if (retryCount < retryMax) {
                    mostrarToast(`Reintentando... (${retryCount}/${retryMax})`, "advertencia");
                    await delay(1000);
                }
            }
        }

        if (currentRequest.controller === controller) {
            limpiarTimers();
        }

        if (!respuesta || !respuesta.ok) {
            const mensaje = respuesta && respuesta.status === 400
                ? "Ciudad no encontrada o inválida"
                : (lastError ? "Fallo de red o servidor" : "No se pudo obtener los lugares");
            throw new Error(mensaje);
        }

        const datos = await respuesta.json();
        if (datos.error) throw new Error(datos.error);

        mostrarToast("Datos obtenidos correctamente", "exito");
        actualizarBoton(false);
        return datos;

    } catch (error) {
        manejarErrores(error, controller);
        return error;
    }

}

function limpiarTimers() {
    clearTimeout(currentRequest.timeoutId);
    clearTimeout(currentRequest.slowWarningId);
    currentRequest = { controller: null, timeoutId: null, slowWarningId: null };
}

function manejarErrores(error, controller) {
    const reason = controller.signal.reason;
    if (reason === 'new_search' || error === 'new_search') return;

    if (currentRequest.controller === controller) {
        limpiarTimers();
        actualizarBoton(false);
    }

    if (reason === 'timeout' || error === 'timeout') {
        mostrarToast("La petición agotó el tiempo de espera (10s)", "error");
    } else {
        mostrarToast(error.message || "Ocurrió un error inesperado", "error");
    }
}