// Función para cargar el archivo JSON y generar el contenido
async function loadContent() {
  try {
    const response = await fetch('dashboard/assets/json/data.json');  // Ajusta la ruta si es necesario
    const data = await response.json();
    window.dashboardData = data;  // Guardar datos en el objeto global
    showContent('idea');  // Mostrar la primera sección por defecto
  } catch (error) {
    console.error("Error al cargar el contenido:", error);
  }
}

// Función para mostrar el contenido de la sección seleccionada
function showContent(stageId) {
  const contentContainer = document.getElementById('content');
  contentContainer.innerHTML = "";  // Limpiar contenido previo

  const stageData = window.dashboardData[stageId];
  if (stageData) {
    // Crear título de la sección
    const title = document.createElement('h3');
    title.textContent = stageData.title;
    contentContainer.appendChild(title);

    if (stageData.subcategories) {
      // Si existen subcategorías, crear una sección para cada una
      stageData.subcategories.forEach(subcategory => {
        // Título de la subcategoría
        const subcategoryTitle = document.createElement('h4');
        subcategoryTitle.textContent = subcategory.name;
        contentContainer.appendChild(subcategoryTitle);

        // Contenido de la subcategoría
        subcategory.content.forEach(item => {
          const contentBox = document.createElement('div');
          contentBox.classList.add('content-box');

          const link = document.createElement('a');
          link.href = item.link;
          link.target = "_blank";
          link.textContent = item.name;

          contentBox.appendChild(link);
          contentContainer.appendChild(contentBox);
        });
      });
    } else if (stageData.content) {
      // Si no hay subcategorías, mostrar el contenido normal
      stageData.content.forEach(item => {
        const contentBox = document.createElement('div');
        contentBox.classList.add('content-box');

        const link = document.createElement('a');
        link.href = item.link;
        link.target = "_blank";
        link.textContent = item.name;

        contentBox.appendChild(link);
        contentContainer.appendChild(contentBox);
      });
    }
  }
}

// Cargar el contenido al inicio
document.addEventListener("DOMContentLoaded", loadContent);
