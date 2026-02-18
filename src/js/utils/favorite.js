const CLASE_ACTIVO = ["text-red-500", "group-hover:text-gray-400"];
const CLASE_INACTIVO = ["text-gray-400", "group-hover:text-red-500"];

let onLocationSelectCallback = null;
import { mostrarToast } from "./toast.js";

export function obtenerFavoritos() {
    return JSON.parse(localStorage.getItem("favoritos") || "[]");
}

export function actualizarEstilosBoton(esFavorito) {
    const icono = document.getElementById("favorite-btn-icon");
    if (!icono) return;

    if (esFavorito) {
        icono.classList.remove(...CLASE_INACTIVO);
        icono.classList.add(...CLASE_ACTIVO);
    } else {
        icono.classList.remove(...CLASE_ACTIVO);
        icono.classList.add(...CLASE_INACTIVO);
    }
}

export function asignarOEliminarFavorito(ciudad) {
    console.log("ciudaFavoriteada: ", ciudad);
    const favoritos = obtenerFavoritos();
    console.log("favoritos: ", favoritos);
    const indice = favoritos.indexOf(ciudad);
    let esFavorito = false;

    if (indice !== -1) {
        favoritos.splice(indice, 1);
        esFavorito = false;
        mostrarToast("Ciudad eliminada de favoritos", "advertencia");
    } else {
        favoritos.push(ciudad);
        esFavorito = true;
        mostrarToast("Ciudad agregada a favoritos", "exito");
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    actualizarEstilosBoton(esFavorito);

    console.log("Favoritos: ", favoritos);
}

export function obtenerSiEsFavorito(ciudad) {
    const favoritos = obtenerFavoritos();
    const esFavorito = favoritos.includes(ciudad);

    actualizarEstilosBoton(esFavorito);
}

function obtenerTodoLosFavoritosUI() {
    const favoritos = obtenerFavoritos();
    const template = document.getElementById("cardFavorito");
    const contenedor = document.getElementById("localizacionesFavoritas");
    contenedor.innerHTML = "";

    favoritos.forEach((favorito) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".nombreFavorito").textContent = favorito;
        clone.querySelector(".botonUbicacionFavorita").onclick = () => {
            if (onLocationSelectCallback) {
                onLocationSelectCallback(favorito);
            }
        };
        contenedor.appendChild(clone);
    });
}

export function inicializarFavoritos(onLocationSelect) {
    onLocationSelectCallback = onLocationSelect;

    const abrirModal = () => {
        obtenerTodoLosFavoritosUI();
        my_modal_3.showModal();
    };

    document.getElementById("favorite-btn-modal").onclick = abrirModal;

    const btnMobile = document.getElementById("favorite-btn-modal-mobile");
    if (btnMobile) btnMobile.onclick = abrirModal;
}