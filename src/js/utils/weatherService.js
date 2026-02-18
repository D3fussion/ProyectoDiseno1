import { delay } from './helpers.js';
import { actualizarBoton } from './dom.js';
import { mostrarToast } from './toast.js';

let currentRequest = {
    controller: null,
    timeoutId: null,
    slowWarningId: null
};

const retryMax = 3;

export const obtenerDatosClima = async (ciudad, coordenadas = false) => {
    if (currentRequest.controller) {
        currentRequest.controller.abort('new_search');
        clearTimeout(currentRequest.timeoutId);
        clearTimeout(currentRequest.slowWarningId);
    }

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
                respuesta = await fetch(`/api/clima?ciudad=${ciudadEncoded}&coordenadas=${coordenadas}`, {
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
                : (lastError ? "Fallo de red o servidor" : "No se pudo obtener el clima");
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