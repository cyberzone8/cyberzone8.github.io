let chartInstance = null;

document.getElementById('conversion-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const currency = document.getElementById('currency').value;
  const resultDiv = document.getElementById('result');
  const chartCanvas = document.getElementById('chart');

  resultDiv.innerHTML = 'Cargando...';

  try {
    const response = await fetch('https://mindicador.cl/api');
    if (!response.ok) throw new Error('Error al obtener los datos de la API');

    const data = await response.json();
    const currencyValue = data[currency]?.valor;

    if (!currencyValue) {
      resultDiv.innerHTML = 'Moneda no encontrada en la API';
      return;
    }

    const convertedAmount = (amount / currencyValue).toFixed(2);
    resultDiv.innerHTML = `<p>${amount} CLP son aproximadamente ${convertedAmount} ${currency.toUpperCase()}</p>`;

    // Obtener historial de los últimos 10 días
    const historyResponse = await fetch(`https://mindicador.cl/api/${currency}`);
    const historyData = await historyResponse.json();

    const labels = historyData.serie.slice(0, 10).map((item) => item.fecha.split('T')[0]);
    const values = historyData.serie.slice(0, 10).map((item) => item.valor);

    // Destruir el gráfico existente si existe
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Crear nueva instancia del gráfico con Chart.js
    chartInstance = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: `Historial de ${currency.toUpperCase()} (10 días)`,
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  } catch (error) {
    resultDiv.innerHTML = `Error: ${error.message}`;
  }
});
