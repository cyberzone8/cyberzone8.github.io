// Custom JS
document.querySelector('#donate .btn').addEventListener('click', function() {
    alert('Gracias por tu interés en donar. Te redirigiremos a la plataforma de pagos.');
    // Aquí podrías redirigir a una página de pago o de donaciones como PayPal
    window.location.href = 'https://www.paypal.com/donate';
});
