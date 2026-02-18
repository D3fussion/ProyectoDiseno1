// La mayoria de este codigo lo saque de la documentacion de Leaflet

var map = L.map('mi-mapa').setView([29.072967, -110.955919], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([29.072967, -110.955919]).addTo(map);

export const volarAPosicion = (lat, lng) => {
    var nuevaPosicion = [lat, lng];
    map.setView(nuevaPosicion);
    marker.setLatLng(nuevaPosicion)
}