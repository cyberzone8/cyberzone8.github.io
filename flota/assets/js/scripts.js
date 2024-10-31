const tablero = document.getElementById('tablero');
const disparosDisplay = document.getElementById('disparosDisplay');
const scoreEnemigosDisplay = document.getElementById('scoreEnemigosDisplay');
const scoreAliadosDisplay = document.getElementById('scoreAliadosDisplay');
const botonReiniciar = document.getElementById('boton-reiniciar');

let navesEnemigas = [];
let navesAliadas = [];
let disparosRestantesJugador = 16;
let navesHundidasEnemigas = 0;
let navesHundidasAliadas = 0;
let turnoJugador = true;

function iniciarJuego() {
  tablero.innerHTML = '';
  navesEnemigas = [];
  navesAliadas = [];
  disparosRestantesJugador = 16;
  navesHundidasEnemigas = 0;
  navesHundidasAliadas = 0;
  turnoJugador = true;

  disparosDisplay.textContent = `Disparos restantes (Jugador): ${disparosRestantesJugador}`;
  scoreEnemigosDisplay.textContent = `Barcos enemigos hundidos: ${navesHundidasEnemigas}`;
  scoreAliadosDisplay.textContent = `Barcos aliados hundidos: ${navesHundidasAliadas}`;

  crearCasillas();
  colocarNaves(navesEnemigas, 0, 49);  // Enemigos en la mitad superior
  colocarNaves(navesAliadas, 50, 99);  // Aliados en la mitad inferior
}

function crearCasillas() {
  for (let i = 0; i < 100; i++) {
    const casilla = document.createElement('div');
    casilla.classList.add('casilla');
    casilla.dataset.index = i;

    const contenido = document.createElement('div');
    contenido.classList.add('contenido');
    casilla.appendChild(contenido);

    casilla.addEventListener('click', () => {
      if (turnoJugador) manejarDisparoJugador(casilla);
    });
    tablero.appendChild(casilla);
  }
}

function colocarNaves(naves, inicio, fin) {
  while (naves.length < 10) {
    const posicion = Math.floor(Math.random() * (fin - inicio + 1)) + inicio;
    if (!naves.includes(posicion)) {
      naves.push(posicion);
      const casilla = tablero.children[posicion].querySelector('.contenido');
      casilla.classList.add('barco');
      casilla.textContent = '🚢';
    }
  }
}

function manejarDisparoJugador(casilla) {
  const index = parseInt(casilla.dataset.index);
  const contenido = casilla.querySelector('.contenido');

  if (!contenido.classList.contains('girado')) {
    disparosRestantesJugador--;
    disparosDisplay.textContent = `Disparos restantes (Jugador): ${disparosRestantesJugador}`;
    contenido.classList.add('girado');
    contenido.style.display = 'block';

    if (navesEnemigas.includes(index)) {
      navesHundidasEnemigas++;
      scoreEnemigosDisplay.textContent = `Barcos enemigos hundidos: ${navesHundidasEnemigas}`;
      contenido.classList.add('barco', 'hit'); // Activa efecto de explosión
      setTimeout(() => alert("¡Acierto! Hundiste un barco enemigo."), 300);
    } else {
      contenido.textContent = '🌊';
      contenido.classList.add('fallo'); // Activa efecto de onda de agua
    }

    if (verificarFinJuego()) {
      finalizarJuego();
    } else {
      turnoJugador = false;
      setTimeout(turnoIA, 1000);
    }
  }
}

function turnoIA() {
  let disparoIA;
  do {
    disparoIA = Math.floor(Math.random() * 50) + 50;
  } while (tablero.children[disparoIA].querySelector('.contenido').classList.contains('girado'));

  const casillaIA = tablero.children[disparoIA];
  const contenidoIA = casillaIA.querySelector('.contenido');
  contenidoIA.classList.add('girado');
  contenidoIA.style.display = 'block';

  if (navesAliadas.includes(disparoIA)) {
    navesHundidasAliadas++;
    scoreAliadosDisplay.textContent = `Barcos aliados hundidos: ${navesHundidasAliadas}`;
    contenidoIA.classList.add('barco', 'hit'); // Activa efecto de explosión
  } else {
    contenidoIA.textContent = '🌊';
    contenidoIA.classList.add('fallo'); // Activa efecto de onda de agua
  }

  turnoJugador = true;

  if (verificarFinJuego()) {
    finalizarJuego();
  }
}

function verificarFinJuego() {
  return (
    disparosRestantesJugador === 0 ||
    navesHundidasEnemigas === 10 ||
    navesHundidasAliadas === 10
  );
}

function finalizarJuego() {
  if (navesHundidasEnemigas === 10 || (navesHundidasEnemigas > navesHundidasAliadas && disparosRestantesJugador === 0)) {
    alert("¡Felicidades! Has ganado.");
  } else {
    alert("La IA ha ganado. Mejor suerte la próxima vez.");
  }
  iniciarJuego();
}

botonReiniciar.addEventListener('click', iniciarJuego);
iniciarJuego();
