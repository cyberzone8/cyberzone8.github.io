// Cargar contenido del JSON y mostrar secciones en la barra lateral
async function loadContent() {
    try {
      const response = await fetch('./assets/json/data-v1.json');
      const data = await response.json();
      populateSidebar(data.secciones);
    } catch (error) {
      console.error("Error al cargar el contenido:", error);
    }
  }
  
  // Agregar secciones a la barra lateral
  function populateSidebar(secciones) {
    const sectionList = document.getElementById('section-list');
    secciones.forEach(section => {
      const button = document.createElement('button');
      button.textContent = section.title;
      button.onclick = () => showContent(section);
      sectionList.appendChild(button);
    });
  }
  
  // Mostrar contenido de la sección seleccionada
  function showContent(section) {
    const contentContainer = document.getElementById('content');
    contentContainer.innerHTML = '';
  
    // Título de la sección
    const title = document.createElement('h3');
    title.textContent = section.title;
    contentContainer.appendChild(title);
  
    // Mostrar cada categoría
    section.categorias.forEach(categoria => {
      const categoryBox = document.createElement('div');
      categoryBox.classList.add('content-box');
  
      const categoryTitle = document.createElement('h4');
      categoryTitle.textContent = categoria.name;
      categoryBox.appendChild(categoryTitle);
  
      // Agregar cada item dentro de la categoría
      categoria.items.forEach(item => {
        const link = document.createElement('a');
        link.href = item.link;
        link.target = '_blank';
        link.textContent = item.name;
        categoryBox.appendChild(link);
        categoryBox.appendChild(document.createElement('br'));
      });
      contentContainer.appendChild(categoryBox);
    });
  }
  
  // Ejecutar al cargar la página
  document.addEventListener('DOMContentLoaded', loadContent);
  