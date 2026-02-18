export function mostrarToast(mensaje, tipo) {

    let clase = "";
    if (tipo == "exito") {
        clase = "bg-green-200 text-gray-800 bg-my-gray font-semibold p-4 rounded-2xl shadow-convex mb-4 hover:shadow-convex-sm hover:bg-green-300 transition-all duration-300 ease-in-out";
    } else if (tipo == "error") {
        clase = "bg-red-200 text-gray-800 bg-my-gray font-semibold p-4 rounded-2xl shadow-convex mb-4 hover:shadow-convex-sm hover:bg-red-300 transition-all duration-300 ease-in-out";
    } else if (tipo == "advertencia") {
        clase = "bg-yellow-200 text-gray-800 bg-my-gray font-semibold p-4 rounded-2xl shadow-convex mb-4 hover:shadow-convex-sm hover:bg-yellow-300 transition-all duration-300 ease-in-out";
    } else {
        clase = "bg-my-gray text-gray-800 bg-my-gray font-semibold p-4 rounded-2xl shadow-convex mb-4 hover:shadow-convex-sm hover:bg-my-gray transition-all duration-300 ease-in-out";
    }

    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        className: clase,
        onClick: function () { }
    }).showToast();
}