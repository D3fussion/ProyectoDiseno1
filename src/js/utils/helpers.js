const traducciones = {
    "leisure.park": "Parque",
    "natural.water": "Cuerpo de agua (Río/Lago)",
    "catering.restaurant": "Restaurante",
    "catering.cafe": "Cafetería",
    "commercial.supermarket": "Supermercado",
    "healthcare.hospital": "Hospital",
    "healthcare.pharmacy": "Farmacia",
    "tourism.hotel": "Hotel",
    "service.fuel": "Gasolinera",
    "amenity.parking": "Estacionamiento",
    "building.residential": "Edificio Residencial"
};

export const delay = millis => new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), millis)
});

export const sanitizarInput = (texto) => {
    if (!texto) return "";
    return texto
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[<>"'/]/g, "")
        .slice(0, 50);
}

export const obtenerNombreDia = (fechaTxt) => {
    const date = new Date(fechaTxt);
    const nombre = date.toLocaleDateString('es-ES', { weekday: 'long' });
    const numero = date.getDate();
    const nombreCapitalizado = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    return `${nombreCapitalizado} ${numero}`;
};

export const obtenerHora = (fechaTxt) => {
    const date = new Date(fechaTxt);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};

export function obtenerDatosLugar(feature) {
    const props = feature.properties;

    let titulo = props.name;

    if (!titulo) {
        return null;
    }

    const direccion = props.address_line2 || props.formatted || "Dirección desconocida";

    return {
        titulo: titulo,
        direccion: direccion,
        coordenadas: feature.geometry.coordinates
    };
}

export function obtenerURLImagen(lat, lon, zoom = 16) {
    const latRad = lat * Math.PI / 180;
    const n = Math.pow(2, zoom);
    const xTile = Math.floor(n * (lon + 180) / 360);
    const yTile = Math.floor(n * (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2);
    return `https://tile.openstreetmap.org/${zoom}/${xTile}/${yTile}.png`;
}

export function obtenerLinkMapa(lat, lon, zoom = 16) {
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}/${lat}/${lon}`;
}


export function obtenerIconoMaterial(idClima) {

    if (idClima >= 200 && idClima < 300) {
        return ["thunderstorm", "#6366f1"];
    } else if (idClima >= 300 && idClima < 400) {
        return ["rainy_light", "#38bdf8"];
    } else if (idClima >= 500 && idClima < 600) {
        return ["rainy", "#2563eb"];
    } else if (idClima >= 600 && idClima < 700) {
        return ["ac_unit", "#06b6d4"];
    } else if (idClima === 800) {
        return ["sunny", "#f59e0b"];
    } else if (idClima >= 801 && idClima <= 802) {
        return ["partly_cloudy_day", "#64748b"];
    } else if (idClima >= 803 && idClima <= 804) {
        return ["cloudy", "#64748b"];
    } else {
        return ["foggy", "#94a3b8"];
    }

}