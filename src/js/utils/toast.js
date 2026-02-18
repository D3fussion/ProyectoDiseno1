export function mostrarToast(mensaje, tipo) {

    let claseCSS = "";

    if (tipo == "exito") {
        claseCSS = "toast-exito";
    } else if (tipo == "error") {
        claseCSS = "toast-error";
    } else if (tipo == "advertencia") {
        claseCSS = "toast-advertencia";
    } else {
        claseCSS = "toast-default";
    }

    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        className: `toast-base ${claseCSS}`,
        style: {
            background: "transparent",
            boxShadow: "none"
        },
        onClick: function () { }
    }).showToast();
}