// Precio base del producto
const precio = 400000;

// Elementos del DOM
const precioSpan = document.querySelector(".precio-inicial");
const cantidadSpan = document.querySelector(".cantidad");
const totalSpan = document.querySelector(".valor-total");
const btnIncrementar = document.getElementById("btn-incrementar");
const btnDecrementar = document.getElementById("btn-decrementar");

// Inicializar valores
precioSpan.innerHTML = precio;
let cantidad = 0;

// Función para actualizar la cantidad y el total
function actualizarTotal() {
    cantidadSpan.textContent = cantidad;
    totalSpan.textContent = precio * cantidad;
}

// Eventos en los botones
btnIncrementar.addEventListener("click", () => {
    cantidad += 1;
    actualizarTotal();
});

btnDecrementar.addEventListener("click", () => {
    if (cantidad > 0) { // Evitar cantidades negativas
        cantidad -= 1;
    }
    actualizarTotal();
});
