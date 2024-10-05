function changeLanguage(lang) {
    // Guardar el idioma seleccionado en el localStorage
    localStorage.setItem('language', lang);

    fetch(`assets/i18n/${lang}.json`)
        .then(response => response.json())
        .then(translations => {
            // Mapeo de IDs a claves de traducción
            const translationMap = {
                'title': translations.title,
                'main-title': translations.title,
                'contact-button': translations.contact_button_text,
                'description': translations.description,
                'product1_title': translations.product1_title,
                'product1_description': translations.product1_description,
                'product2_title': translations.product2_title,
                'product2_description': translations.product2_description,
                'product3_title': translations.product3_title,
                'product3_description': translations.product3_description,
                'product4_title': translations.product4_title,
                'product4_description': translations.product4_description,
                'product5_title': translations.product5_title,
                'product5_description': translations.product5_description,
                'product6_title': translations.product6_title,
                'product6_description': translations.product6_description,
                'footer_text': translations.footer_text
            };

            // Actualiza el contenido del DOM con las traducciones
            Object.keys(translationMap).forEach(id => {
                const element = document.getElementById(id);
                if (element) element.textContent = translationMap[id];
            });
        })
        .catch(error => console.error('Error al cargar las traducciones:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultLang = 'es'; // Idioma predeterminado
    const savedLang = localStorage.getItem('language') || defaultLang;
    changeLanguage(savedLang);
    updateClocks(); // Inicializar relojes al cargar la página
    setInterval(updateClocks, 1000); // Actualizar relojes cada segundo
});

function updateClocks() {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const timezones = {
        'chile-time': 'America/Santiago',
        'brazil-time': 'America/Sao_Paulo',
        'ireland-time': 'Europe/Dublin',
        'china-time': 'Asia/Shanghai'
    };

    Object.keys(timezones).forEach(id => {
        const time = new Date().toLocaleTimeString('es-CL', {
            ...options,
            timeZone: timezones[id]
        });
        document.getElementById(id).textContent = time;
    });
}

