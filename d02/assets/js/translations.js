function changeLanguage(lang) {
    fetch(`assets/i18n/${lang}.json`)
        .then(response => response.json())
        .then(translations => {
            // Actualiza el contenido del DOM con las traducciones
            document.getElementById('title').textContent = translations.title;
            document.getElementById('main-title').textContent = translations.title;
            document.getElementById('contact_button_text').textContent = translations.title;
            document.getElementById('description').textContent = translations.description;
            document.getElementById('product1_title').textContent = translations.product1_title;
            document.getElementById('product1_description').textContent = translations.product1_description;
            document.getElementById('product2_title').textContent = translations.product2_title;
            document.getElementById('product2_description').textContent = translations.product2_description;
            document.getElementById('product3_title').textContent = translations.product3_title;
            document.getElementById('product3_description').textContent = translations.product3_description;
            document.getElementById('product4_title').textContent = translations.product1_title;
            document.getElementById('product4_description').textContent = translations.product1_description;
            document.getElementById('product5_title').textContent = translations.product2_title;
            document.getElementById('product5_description').textContent = translations.product2_description;
            document.getElementById('product6_title').textContent = translations.product3_title;
            document.getElementById('product6_description').textContent = translations.product3_description;
            document.getElementById('footer_text').textContent = translations.footer_text;
        })
        .catch(error => console.error('Error al cargar las traducciones:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultLang = 'es'; // Idioma predeterminado
    const savedLang = localStorage.getItem('language') || defaultLang;
    changeLanguage(savedLang);
});

function changeLanguage(lang) {
    // Guardar el idioma seleccionado en el localStorage
    localStorage.setItem('language', lang);
    fetch(`assets/i18n/${lang}.json`)
        .then(response => response.json())
        .then(translations => {
            // Actualiza el contenido del DOM con las traducciones
            document.getElementById('title').textContent = translations.title;
            document.getElementById('main-title').textContent = translations.title;
            document.getElementById('description').textContent = translations.description;
            document.getElementById('product1_title').textContent = translations.product1_title;
            document.getElementById('product1_description').textContent = translations.product1_description;
            document.getElementById('product2_title').textContent = translations.product2_title;
            document.getElementById('product2_description').textContent = translations.product2_description;
            document.getElementById('product3_title').textContent = translations.product3_title;
            document.getElementById('product3_description').textContent = translations.product3_description;
            document.getElementById('footer_text').textContent = translations.footer_text;
        })
        .catch(error => console.error('Error al cargar las traducciones:', error));
}