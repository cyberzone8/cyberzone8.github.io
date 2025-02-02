export default async function handler(req, res) {
    try {
        const response = await fetch('https://mindicador.cl/api/uf');
        if (!response.ok) throw new Error('Error al obtener datos de la API externa.');
        const data = await response.json();
        const ufValue = data.uf.valor;
        res.status(200).json({ uf: ufValue });
    } catch (error) {
        console.error('Error al obtener el valor de la UF:', error);
        res.status(500).json({ error: 'Error al obtener el valor de la UF' });
    }
}
