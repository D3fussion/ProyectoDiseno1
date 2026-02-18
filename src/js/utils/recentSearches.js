const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 3;

export function getRecentSearches() {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || "[]");
}

export function saveRecentSearch(term) {
    if (!term) return;

    // Validate that it's not a coordinate string to avoid saving geolocation searches as text
    if (/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(term)) return;

    let searches = getRecentSearches();

    // Remove if already exists to move it to the top
    searches = searches.filter(s => s.toLowerCase() !== term.toLowerCase());

    // Add to the beginning
    searches.unshift(term);

    // Keep only the last MAX_RECENT_SEARCHES
    searches = searches.slice(0, MAX_RECENT_SEARCHES);

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
}

export function renderRecentSearches(container, callback) {
    const searches = getRecentSearches();
    container.innerHTML = "";

    if (searches.length === 0) {
        container.classList.remove('opacity-100', 'visible');
        container.classList.add('opacity-0', 'invisible');
        return;
    }

    container.classList.remove('opacity-0', 'invisible');
    container.classList.add('opacity-100', 'visible');

    // Add header or separator if needed, but for now just the items
    const header = document.createElement("div");
    header.className = "px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider";
    header.textContent = "Búsquedas recientes";
    container.appendChild(header);

    searches.forEach(term => {
        const div = document.createElement("div");
        div.className = "px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors flex items-center gap-3";

        div.innerHTML = `
            <span class="material-symbols-outlined text-gray-400 text-lg">history</span>
            <span class="font-medium text-gray-700">${term}</span>
        `;

        div.onclick = () => {
            // Hide suggestions immediately
            container.classList.remove('opacity-100', 'visible');
            container.classList.add('opacity-0', 'invisible');

            // Fill input with term
            const input = document.getElementById("inputBusqueda");
            if (input) input.value = term;

            if (callback) callback(term);
        };

        container.appendChild(div);
    });
}
