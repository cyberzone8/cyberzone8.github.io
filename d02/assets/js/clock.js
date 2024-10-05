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

    // Hora en Chile (UTC-3 o UTC-4 dependiendo del horario de verano)
    const chileTime = new Date().toLocaleTimeString('es-CL', {
        ...options,
        timeZone: 'America/Santiago'
    });
    document.getElementById('chile-time').textContent = chileTime;

    // Hora en Brasil (UTC-3 o UTC-4 dependiendo del horario de verano)
    const brazilTime = new Date().toLocaleTimeString('pt-BR', {
        ...options,
        timeZone: 'America/Sao_Paulo'
    });
    document.getElementById('brazil-time').textContent = brazilTime;

    // Hora en Irlanda (UTC+0 o UTC+1 con horario de verano)
    const irelandTime = new Date().toLocaleTimeString('en-IE', {
        ...options,
        timeZone: 'Europe/Dublin'
    });
    document.getElementById('ireland-time').textContent = irelandTime;

    // Hora en China (UTC+8)
    const chinaTime = new Date().toLocaleTimeString('zh-CN', {
        ...options,
        timeZone: 'Asia/Shanghai'
    });
    document.getElementById('china-time').textContent = chinaTime;
}
