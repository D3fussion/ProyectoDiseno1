// Los iconos los hizo Claude

const iconosClima = {
    "tormenta": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-40 h-24 bg-gray-700 rounded-full absolute top-8 left-4 opacity-90 shadow-[8px_8px_16px_rgba(0,0,0,0.3)]"></div>
            <div class="w-32 h-20 bg-gray-600 rounded-full absolute top-12 left-8 opacity-90"></div>
            <div class="w-28 h-16 bg-gray-800 rounded-full absolute top-10 right-4 opacity-90"></div>
            <svg class="w-12 h-16 absolute bottom-12 left-16 text-yellow-300 animate-lightning" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
            </svg>
            <div class="rain-drop w-1 h-6 bg-blue-400 rounded-full absolute bottom-4 left-12 opacity-70"></div>
            <div class="rain-drop w-1 h-6 bg-blue-400 rounded-full absolute bottom-4 left-20 opacity-70"></div>
            <div class="rain-drop w-1 h-6 bg-blue-400 rounded-full absolute bottom-4 left-28 opacity-70"></div>
        </div>
    `,
    "llovizna": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-40 h-24 bg-gray-400 rounded-full absolute top-8 left-4 opacity-90 shadow-[8px_8px_16px_rgba(209,210,211,0.5)]"></div>
            <div class="w-32 h-20 bg-gray-300 rounded-full absolute top-12 left-8 opacity-90"></div>
            <div class="rain-drop w-0.5 h-4 bg-blue-300 rounded-full absolute bottom-8 left-10 opacity-60"></div>
            <div class="rain-drop w-0.5 h-4 bg-blue-300 rounded-full absolute bottom-8 left-16 opacity-60"></div>
            <div class="rain-drop w-0.5 h-4 bg-blue-300 rounded-full absolute bottom-8 left-22 opacity-60"></div>
            <div class="rain-drop w-0.5 h-4 bg-blue-300 rounded-full absolute bottom-8 left-28 opacity-60"></div>
            <div class="rain-drop w-0.5 h-4 bg-blue-300 rounded-full absolute bottom-8 left-34 opacity-60"></div>
        </div>
    `,
    "lluvia": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-40 h-24 bg-gray-500 rounded-full absolute top-8 left-4 opacity-90 shadow-[8px_8px_16px_rgba(209,210,211,0.5)]"></div>
            <div class="w-32 h-20 bg-gray-400 rounded-full absolute top-12 left-8 opacity-90"></div>
            <div class="rain-drop w-1 h-8 bg-blue-400 rounded-full absolute bottom-4 left-10 opacity-70"></div>
            <div class="rain-drop w-1 h-8 bg-blue-400 rounded-full absolute bottom-4 left-18 opacity-70"></div>
            <div class="rain-drop w-1 h-8 bg-blue-400 rounded-full absolute bottom-4 left-26 opacity-70"></div>
            <div class="rain-drop w-1 h-8 bg-blue-400 rounded-full absolute bottom-4 left-34 opacity-70"></div>
        </div>
    `,
    "nieve": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-40 h-24 bg-gray-300 rounded-full absolute top-8 left-4 opacity-90 shadow-[8px_8px_16px_rgba(209,210,211,0.5)]"></div>
            <div class="w-32 h-20 bg-white rounded-full absolute top-12 left-8 opacity-90"></div>
            <div class="snow-flake w-3 h-3 bg-white rounded-full absolute bottom-8 left-12 opacity-80 shadow-md"></div>
            <div class="snow-flake w-3 h-3 bg-white rounded-full absolute bottom-8 left-20 opacity-80 shadow-md"></div>
            <div class="snow-flake w-3 h-3 bg-white rounded-full absolute bottom-8 left-28 opacity-80 shadow-md"></div>
            <div class="snow-flake w-3 h-3 bg-white rounded-full absolute bottom-8 left-36 opacity-80 shadow-md"></div>
            <div class="snow-flake w-2 h-2 bg-white rounded-full absolute bottom-16 left-16 opacity-80 shadow-md"></div>
        </div>
    `,
    "despejado-amanecer": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-40 h-40 rounded-full bg-gradient-to-tr from-pink-300 via-rose-300 to-orange-300 shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),8px_8px_16px_rgba(255,182,193,0.6)] animate-pulse-slow"></div>
        </div>
    `,
    "despejado-dia": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-40 h-40 rounded-full bg-gradient-to-tr from-yellow-300 to-orange-400 shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),8px_8px_16px_rgba(209,210,211,0.6)] animate-pulse"></div>
        </div>
    `,
    "despejado-atardecer": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-40 h-40 rounded-full bg-gradient-to-tr from-orange-400 via-red-400 to-purple-400 shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.4),8px_8px_16px_rgba(220,120,95,0.6)] animate-pulse-slow"></div>
        </div>
    `,
    "despejado-noche": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-40 h-40 rounded-full bg-gradient-to-tr from-blue-100 to-gray-300 shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),8px_8px_16px_rgba(100,116,139,0.6)] animate-pulse-slow"></div>
            <div class="w-8 h-8 rounded-full bg-gray-400 absolute top-16 left-20 opacity-40 shadow-inner"></div>
            <div class="w-6 h-6 rounded-full bg-gray-400 absolute top-24 left-24 opacity-30 shadow-inner"></div>
            <div class="w-4 h-4 rounded-full bg-gray-400 absolute top-20 right-20 opacity-30 shadow-inner"></div>
        </div>
    `,
    "nubesLigeras-amanecer": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-40 h-40 rounded-full bg-gradient-to-tr from-pink-300 via-rose-300 to-orange-300 shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),8px_8px_16px_rgba(255,182,193,0.6)] absolute top-0 right-4 animate-pulse-slow"></div>
            <div class="w-48 h-24 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full absolute bottom-8 left-0 opacity-90 shadow-[8px_8px_16px_rgba(255,182,193,0.4),inset_2px_2px_6px_rgba(255,255,255,0.8)]"></div>
            <div class="w-24 h-24 bg-gradient-to-br from-white to-pink-100 rounded-full absolute bottom-12 left-8 opacity-90"></div>
        </div>
    `,
    "nubesLigeras-dia": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-40 h-40 rounded-full bg-gradient-to-tr from-yellow-300 to-orange-400 shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),8px_8px_16px_rgba(209,210,211,0.6)] absolute top-0 right-4 animate-pulse"></div>
            <div class="w-48 h-24 bg-white rounded-full absolute bottom-8 left-0 opacity-90 shadow-[8px_8px_16px_rgba(209,210,211,0.5),inset_2px_2px_6px_#fff]"></div>
            <div class="w-24 h-24 bg-white rounded-full absolute bottom-12 left-8 opacity-90"></div>
        </div>
    `,
    "nubesLigeras-atardecer": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-40 h-40 rounded-full bg-gradient-to-tr from-orange-400 via-red-400 to-purple-400 shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.4),8px_8px_16px_rgba(220,120,95,0.6)] absolute top-0 right-4 animate-pulse-slow"></div>
            <div class="w-48 h-24 bg-gradient-to-br from-orange-200 to-purple-300 rounded-full absolute bottom-8 left-0 opacity-90 shadow-[8px_8px_16px_rgba(220,120,95,0.4),inset_2px_2px_6px_rgba(255,255,255,0.6)]"></div>
            <div class="w-24 h-24 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full absolute bottom-12 left-8 opacity-90"></div>
        </div>
    `,
    "nubesLigeras-noche": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-40 h-40 rounded-full bg-gradient-to-tr from-blue-100 to-gray-300 shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),8px_8px_16px_rgba(100,116,139,0.6)] absolute top-0 right-4 animate-pulse-slow"></div>
            <div class="w-8 h-8 rounded-full bg-gray-400 absolute top-12 right-8 opacity-40 shadow-inner"></div>
            <div class="w-6 h-6 rounded-full bg-gray-400 absolute top-20 right-10 opacity-30 shadow-inner"></div>
            <div class="w-48 h-24 bg-gradient-to-br from-slate-300 to-blue-200 rounded-full absolute bottom-8 left-0 opacity-80 shadow-[8px_8px_16px_rgba(100,116,139,0.5),inset_2px_2px_6px_rgba(255,255,255,0.4)]"></div>
            <div class="w-24 h-24 bg-gradient-to-br from-slate-200 to-blue-100 rounded-full absolute bottom-12 left-8 opacity-80"></div>
        </div>
    `,
    "nubes": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-44 h-28 bg-gray-400 rounded-full absolute top-8 left-2 opacity-90 shadow-[8px_8px_16px_rgba(209,210,211,0.5)] animate-fog"></div>
            <div class="w-40 h-24 bg-gray-300 rounded-full absolute top-12 left-6 opacity-90 animate-fog" style="animation-delay: 0.5s;"></div>
            <div class="w-36 h-20 bg-gray-400 rounded-full absolute top-14 right-4 opacity-90 animate-fog" style="animation-delay: 1s;"></div>
            <div class="w-32 h-24 bg-gray-500 rounded-full absolute bottom-8 left-8 opacity-90 animate-fog" style="animation-delay: 1.5s;"></div>
        </div>
    `,
    "atmosfera": `
        <div class="relative w-48 h-48 flex items-center justify-center">
            <div class="w-44 h-8 bg-gray-300 rounded-full absolute top-12 animate-fog opacity-60 shadow-md"></div>
            <div class="w-40 h-8 bg-gray-400 rounded-full absolute top-20 animate-fog opacity-50 shadow-md" style="animation-delay: 1s;"></div>
            <div class="w-44 h-8 bg-gray-300 rounded-full absolute top-28 animate-fog opacity-60 shadow-md" style="animation-delay: 2s;"></div>
            <div class="w-36 h-8 bg-gray-400 rounded-full absolute top-36 animate-fog opacity-50 shadow-md" style="animation-delay: 1.5s;"></div>
        </div>
    `
}

const obtenerSufijoTiempo = (hora) => {
    if (hora >= 600 && hora < 1100) return "-amanecer";
    if (hora >= 1100 && hora < 1800) return "-dia";
    if (hora >= 1800 && hora < 2100) return "-atardecer";
    return "-noche";
};

const cambiarGlowFondo = (hora) => {
    let color = "#C4EFFF";

    if (hora >= 600 && hora < 1100) color = "#FFDAB9";
    else if (hora >= 1100 && hora < 1800) color = "#C4EFFF";
    else if (hora >= 1800 && hora < 2100) color = "#FBCFE8";
    else color = "#334155";

    document.documentElement.style.setProperty("--glow-color", color);
}

export const cambiarIconoClima = (idClima, horaLocal) => {
    let claveIcono = "atmosfera";

    if (idClima >= 200 && idClima < 300) {
        claveIcono = "tormenta";
    } else if (idClima >= 300 && idClima < 400) {
        claveIcono = "llovizna";
    } else if (idClima >= 500 && idClima < 600) {
        claveIcono = "lluvia";
    } else if (idClima >= 600 && idClima < 700) {
        claveIcono = "nieve";
    } else if (idClima === 800) {
        claveIcono = `despejado${obtenerSufijoTiempo(horaLocal)}`;
    } else if (idClima >= 801 && idClima <= 802) {
        claveIcono = `nubesLigeras${obtenerSufijoTiempo(horaLocal)}`;
    } else if (idClima >= 803 && idClima <= 804) {
        claveIcono = "nubes";
    }

    cambiarGlowFondo(horaLocal);

    const icono = document.getElementById("imagenClima");
    if (iconosClima[claveIcono]) {
        console.log("claveIcono", claveIcono);
        icono.innerHTML = iconosClima[claveIcono];
    } else {
        console.warn("Icono no encontrado para:", claveIcono);
    }
};