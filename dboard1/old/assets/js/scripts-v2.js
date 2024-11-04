// Obtener referencias a los elementos HTML
const addTagButton = document.getElementById('add-tag-btn');
const tagList = document.getElementById('tag-list');
const contentArea = document.getElementById('content');

// Contador para etiquetar dinámicamente las etiquetas creadas
let tagCount = 1;

// Función para crear etiquetas dinámicas
function addTag() {
  // Crear un nuevo elemento de etiqueta
  const newTag = document.createElement('div');
  newTag.classList.add('tag');
  newTag.innerText = `Etiqueta ${tagCount}`;
  newTag.dataset.tagId = tagCount;

  // Añadir un evento para mostrar contenido al hacer clic
  newTag.addEventListener('click', () => {
    contentArea.innerHTML = `<h2>Contenido de Etiqueta ${tagCount}</h2><p>Este es el contenido de la etiqueta ${tagCount}.</p>`;
  });

  // Añadir la etiqueta al sidebar y aumentar el contador
  tagList.appendChild(newTag);
  tagCount++;
}

// Evento para el botón de añadir etiqueta
addTagButton.addEventListener('click', addTag);
