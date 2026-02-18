// La mayoria de este codigo lo saque de la documentacion de LocationIQ
import { mostrarToast } from "./toast.js";

const locationiqKey = "pk.2215333ade3564f5bc3bc8beaadad830";
// No es necesario esconder esta Key por que la tome de la pagina de LocationIQ
const inputElement = document.getElementById("inputBusqueda");
const resultsContainer = document.getElementById("listaAutoCompletado");

let onLocationSelectCallback = null;

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const handleInput = async (e) => {
    const value = e.target.value.trim();

    if (!value || value.length < 3) {
        hideSuggestions();
        return;
    }

    try {
        const params = new URLSearchParams({
            key: locationiqKey,
            q: value,
            format: 'json',
            limit: 5,
            dedupe: 1
        });

        const response = await fetch(`https://api.locationiq.com/v1/autocomplete?${params}`);

        if (!response.ok) throw new Error('Error en la red');

        const data = await response.json();

        const suggestions = data.map(item => ({
            display_place: item.display_place || item.display_name.split(',')[0],
            display_address: item.display_address || item.display_name,
            lat: item.lat,
            lon: item.lon,
            display_name: item.display_name
        }));

        renderSuggestions(suggestions, value);

    } catch (error) {
        console.error("Error fetching data:", error);
        mostrarToast("Error al obtener sugerencias de búsqueda", "error");
    }
};

function renderSuggestions(suggestions, currentValue) {
    resultsContainer.innerHTML = '';

    if (suggestions.length > 0) {
        resultsContainer.classList.remove('opacity-0', 'invisible');
        resultsContainer.classList.add('opacity-100', 'visible');
    } else {
        resultsContainer.classList.remove('opacity-100', 'visible');
        resultsContainer.classList.add('opacity-0', 'invisible');
        return;
    }

    suggestions.forEach((suggestion, index) => {
        const div = document.createElement("div");

        div.className = "px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors";

        const nameHtml = highlight(suggestion.display_place, currentValue);
        const addressHtml = highlight(suggestion.display_address, currentValue);

        div.innerHTML = `
                    <div class="font-medium text-gray-900">${nameHtml}</div>
                    <div class="text-xs text-gray-500 mt-0.5">${addressHtml}</div>
                `;

        div.addEventListener("click", function () {
            resultsContainer.classList.remove('opacity-100', 'visible');
            resultsContainer.classList.add('opacity-0', 'invisible');
            resultsContainer.innerHTML = '';
            if (onLocationSelectCallback) {
                onLocationSelectCallback(`${suggestion.lat},${suggestion.lon}`, true);
            }
        });

        resultsContainer.appendChild(div);
    });
}

function highlight(text, focus) {
    if (!text) return "";
    const cleanFocus = focus.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
    const r = new RegExp(`(${cleanFocus})`, 'gi');
    return text.replace(r, '<span class="font-bold text-my-blue">$1</span>');
}

export function hideSuggestions() {
    resultsContainer.classList.remove('opacity-100', 'visible');
    resultsContainer.classList.add('opacity-0', 'invisible');
}

export function inicializarAutoComplete(callbackBusqueda) {
    onLocationSelectCallback = callbackBusqueda;

    inputElement.addEventListener("input", debounce(handleInput, 250));

    document.addEventListener("click", function (e) {
        if (!inputElement.contains(e.target) && !resultsContainer.contains(e.target)) {
            hideSuggestions();
        }
    });
}