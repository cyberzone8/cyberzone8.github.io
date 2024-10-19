// Función para cargar un archivo markdown y convertirlo a HTML
async function loadMarkdown(file, elementId) {
    const response = await fetch(file);
    if (response.ok) {
        const text = await response.text();
        const htmlContent = marked(text); // Usa la biblioteca 'marked' para convertir Markdown a HTML
        document.getElementById(elementId).innerHTML = htmlContent;
    } else {
        console.error('Error loading Markdown file:', response.statusText);
    }
}
