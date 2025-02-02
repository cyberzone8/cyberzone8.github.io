// script.js

// Arreglos de propiedades
const propiedades_venta = [
    {
      nombre: "Casa en Las Lomas",
      src: "assets/img/casa1.jpg",
      descripcion: "Hermosa casa en una zona tranquila.",
      ubicacion: "Las Lomas",
      habitaciones: 4,
      baños:4,
      costo: 120000,
      smoke: true,
      pets: true,
    },
    {
      nombre: "Casa Moderna",
      src: "assets/img/casa2.jpg",
      descripcion: "Casa moderna con acabados de lujo.",
      ubicacion: "Miraflores",
      habitaciones: 4,
      baños:3,
      costo: 200000,
      smoke: true,
      pets: false,
    },
    {
      nombre: "Residencia Familiar",
      src: "assets/img/casa3.jpg",
      descripcion: "Ideal para familias, amplia y cómoda.",
      ubicacion: "San Isidro",
      habitaciones: 5,
      baños:4,
      costo: 150000,
      smoke: false,
      pets: true,
    },
    {
      nombre: "Villa Privada",
      src: "assets/img/casa4.jpg",
      descripcion: "Villa exclusiva con vista panorámica.",
      ubicacion: "La Molina",
      habitaciones: 6,
      baños:5,
      costo: 300000,
      smoke: false,
      pets: false,
    },
  ];
  
  const propiedades_alquiler = [
    {
      nombre: "Departamento Moderno",
      src: "assets/img/depa1.jpg",
      descripcion: "Departamento en zona céntrica.",
      ubicacion: "Miraflores",
      habitaciones: 2,
      baños:2,
      costo: 800,
      smoke: true,
      pets: true,
    },
    {
      nombre: "Casa Familiar",
      src: "assets/img/depa2.jpg",
      descripcion: "Casa ideal para familias grandes.",
      ubicacion: "La Molina",
      habitaciones: 4,
      baños:2,
      costo: 1200,
      smoke: false,
      pets: true,
    },
    {
      nombre: "Pequeño Estudio",
      src: "assets/img/depa3.jpg",
      descripcion: "Perfecto para profesionales.",
      ubicacion: "San Borja",
      habitaciones: 1,
      baños:1,
      costo: 500,
      smoke: true,
      pets: false,
    },
    {
      nombre: "Villa Exclusiva",
      src: "assets/img/depa4.jpg",
      descripcion: "Villa de lujo con todas las comodidades.",
      ubicacion: "Surco",
      habitaciones: 3,
      baños:4,
      costo: 2000,
      smoke: false,
      pets: false,
    },
  ];
  
  // Función para generar tarjetas dinámicamente
  function generarTarjetas(propiedades, seccionId) {
    const seccion = document.getElementById(seccionId);
    seccion.innerHTML = ""; // Limpiar contenido previo
  
    propiedades.forEach((propiedad) => {
      seccion.innerHTML += `
        <div class="col-md-3">
          <div class="card">
            <img src="${propiedad.src}" class="card-img-top" alt="${propiedad.nombre}">
            <div class="card-body">
              <h5 class="card-title">${propiedad.nombre}</h5>
              <p class="card-text">${propiedad.descripcion}</p>
              <p class="card-text"><strong>Ubicación:</strong> ${propiedad.ubicacion}</p>
              <p class="card-text"><strong>Habitaciones:</strong> ${propiedad.habitaciones}</p>
              <p class="card-text"><strong>Baños:</strong> ${propiedad.baños}</p>
              <p class="card-text"><strong>Precio:</strong> $${propiedad.costo}</p>
              <p class="card-text">${propiedad.pets ? "🐾 Se permiten mascotas" : "🚫 No se permiten mascotas"}</p>
              <p class="card-text">${propiedad.smoke ? "🚬 Se permite fumar" : "🚭 No se permite fumar"}</p>
              <a href="#" class="btn btn-primary">Ver detalles</a>
            </div>
          </div>
        </div>
      `;
    });
  }
  
  // Lógica para cargar propiedades en las páginas específicas
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("venta")) {
      generarTarjetas(propiedades_venta, "venta");
    }
  
    if (document.getElementById("alquiler")) {
      generarTarjetas(propiedades_alquiler, "alquiler");
    }
  
    if (document.getElementById("index-venta")) {
      generarTarjetas(propiedades_venta.slice(0, 3), "index-venta");
    }
  
    if (document.getElementById("index-alquiler")) {
      generarTarjetas(propiedades_alquiler.slice(0, 3), "index-alquiler");
    }
  });
  