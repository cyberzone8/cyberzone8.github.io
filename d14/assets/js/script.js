// Modificar función para recibir el elemento clickeado
function pintar(elemento, color = "green") {
    elemento.style.backgroundColor = color;
}

// Seleccionar elemento y agregar evento
const ele = document.getElementById("ele1");
ele.addEventListener("click", function () {
    pintar(ele, "yellow"); // Cambiar a amarillo al hacer clic
});
