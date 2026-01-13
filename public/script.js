// HTML VARIABLES
// Se obtienen las referencias a las secciones principales del DOM para mostrar ataques, reinicio, mensajes, vidas y el boton de mascota del jugador
const sectionSelectAttack = document.getElementById('select-attack');
const sectionReset = document.getElementById('section-reset');
const divMessage = document.getElementById('messages');
const divLifes = document.getElementById('card-attack-div');
const buttonPetPlayer = document.getElementById('button-pet');

// Boton para reiniciar la partida
const buttonReset = document.getElementById('button-reset');

// Elementos relacionados con la seleccion de mascota y el combate
const spanPetPlayer = document.getElementById('pet__player');
const sectionSelectPet = document.getElementById('select-pet');
const startMessage = document.getElementById('start-message');
const resultDiv = document.getElementById('result-div');
const attackPlayerDiv = document.getElementById('attackPlayer-div');
const attackEnemyDiv = document.getElementById('attackEnemy-div');
const petEnemy = document.getElementById('pet__enemy');
const containerCards = document.getElementById('container-cards');
const containerButtons = document.getElementById('container-buttons');

// Elementos que muestran las vidas o puntos de victoria
const petEnemyLife = document.getElementById('enemy-pet-life');
const petPlayerLife = document.getElementById('player-pet-life');

// Seccion del mapa y canvas del juego
const sectionWatchMap = document.getElementById('watch-map');
const map = document.getElementById('map');

// Arrays para almacenar los ataques elegidos por el jugador y el enemigo
let attackPlayer = [];
let attackEnemy = [];
let result = '';
let enemyId = null;

// Listas de mokepones del jugador y enemigos, botones y ataques usados
let mokepones = [];
let mokeponesEnemy = [];
let buttons = [];
let usedAttacksPlayer = [];
let attacksMokeponEnemy;

// Indices de ataques usados en el combate y contadores de victorias
let indexAttackPlayer;
let indexAttackEnemy;
let victoriesPlayer = 0;
let victoriesEnemy = 0;

// Nombre de la mascota seleccionada por el jugador
let petPlayer = '';

// Inputs para cada mascota disponible
let inputChamaleon;
let inputTurtle;
let inputBasur;
let inputTucapalma;
let inputLangosta;
let inputPydos;

// Objeto que representa la mascota del jugador en el mapa
let petPlayerObject;

// Variables temporales para generar opciones de mokepones y botones de ataque
let optionMokepon;
let optionAttack;

// Referencias a los botones de cada tipo de ataque
let buttonFire;
let buttonWater;
let buttonGround;

// Contexto del canvas y configuracion basica del mapa
let lienzo = map.getContext('2d');
let interval;
let mapBackground = new Image();
mapBackground.src = 'assets/mokemap.png';

// Calculo de tamanos del mapa en funcion del ancho de ventana
let findHeight;
let widthMap = window.innerWidth - 20;
const maxWidthMap = 500;

// Identificador del jugador que devuelve el servidor
let playerId = null;

// Limitar el ancho del mapa a un maximo para no deformar el canvas
if (widthMap > maxWidthMap) {
  widthMap = maxWidthMap;
}

// Mantener la relacion de aspecto original del mapa
findHeight = (widthMap * 600) / 800;

// Asignar ancho y alto finales al canvas
map.width = widthMap;
map.height = findHeight;

// Clase base que representa un mokepon tanto en datos como en el mapa
class Mokepon {
  constructor(name, photo, life, photoMap, id = null) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.life = life;
    this.attacks = [];
    this.width = 50;
    this.height = 50;
    // Posicion inicial aleatoria dentro de los limites del mapa
    this.x = random(0, map.width - this.width);
    this.y = random(0, map.height - this.height);
    this.mapPhoto = new Image();
    this.mapPhoto.src = photoMap;
    // Velocidades para mover el mokepon en el mapa
    this.velX = 0;
    this.velY = 0;
  }

  // Dibuja el mokepon en el canvas segun su posicion actual
  paintMokepon() {
    lienzo.drawImage(this.mapPhoto, this.x, this.y, this.width, this.height);
  }
}

// Instancias de cada mokepon disponible en el juego
let chamaleon = new Mokepon('Chamaleon','assets/Chamaleon_attack.png',5,'assets/Chamaleon_attack.png');
let turtle = new Mokepon('Turtle','assets/Turtle_attack.png',5,'assets/Turtle_attack.png');
let basur = new Mokepon('Basur','assets/Basur_attack.png',5,'assets/Basur_attack.png');
let pydos = new Mokepon('Pydos','assets/Pydos_attack.png',5,'assets/Pydos_attack.png');
let tucapalma = new Mokepon('Tucapalma','assets/Tucapalma_attack.png',5,'assets/Tucapalma_attack.png');
let langosta = new Mokepon('Langosta','assets/Langosta_attack.png',5,'assets/Langosta_attack.png');

// Listas de ataques permitidos para cada mokepon
const chamaleonAttacks = [
  { name: 'Fire', id: 'button__fire' },
  { name: 'Fire', id: 'button__fire' },
  { name: 'Fire', id: 'button__fire' },
  { name: 'Water', id: 'button__water' },
  { name: 'Ground', id: 'button__ground' },
];

const turtleAttacks = [
  { name: 'Water', id: 'button__water' },
  { name: 'Water', id: 'button__water' },
  { name: 'Water', id: 'button__water' },
  { name: 'Fire', id: 'button__fire' },
  { name: 'Ground', id: 'button__ground' },
];

const basurAttacks = [
  { name: 'Ground', id: 'button__ground' },
  { name: 'Ground', id: 'button__ground' },
  { name: 'Ground', id: 'button__ground' },
  { name: 'Water', id: 'button__water' },
  { name: 'Fire', id: 'button__fire' },
];

const pydosAttacks = [
  { name: 'Fire', id: 'button__fire' },
  { name: 'Fire', id: 'button__fire' },
  { name: 'Fire', id: 'button__fire' },
  { name: 'Water', id: 'button__water' },
  { name: 'Ground', id: 'button__ground' },
];

const tucapalmaAttacks = [
  { name: 'Water', id: 'button__water' },
  { name: 'Water', id: 'button__water' },
  { name: 'Water', id: 'button__water' },
  { name: 'Fire', id: 'button__fire' },
  { name: 'Ground', id: 'button__ground' },
];

const langostaAttacks = [
  { name: 'Ground', id: 'button__ground' },
  { name: 'Ground', id: 'button__ground' },
  { name: 'Ground', id: 'button__ground' },
  { name: 'Water', id: 'button__water' },
  { name: 'Fire', id: 'button__fire' },
];

// Se asocian los ataques a cada mokepon
turtle.attacks.push(...turtleAttacks);
chamaleon.attacks.push(...chamaleonAttacks);
basur.attacks.push(...basurAttacks);
pydos.attacks.push(...pydosAttacks);
tucapalma.attacks.push(...tucapalmaAttacks);
langosta.attacks.push(...langostaAttacks);

// Se guarda la lista de todos los mokepones disponibles
mokepones.push(chamaleon, turtle, basur, pydos, tucapalma, langosta);

// Funcion principal que se ejecuta al cargar la pagina
function startGame() {
  // Al inicio se ocultan las secciones de ataque y mapa
  sectionSelectAttack.style.display = 'none';
  sectionWatchMap.style.display = 'none';

  // Se crean dinamicamente las tarjetas de seleccion de mokepon
  mokepones.forEach((mokepon) => {
    optionMokepon = `
    <input type="radio" name="pet" id="${mokepon.name}" />
    <label for="${mokepon.name}" class="card-pet-label">
            ${mokepon.name}
            <img
              class="img-pet"
              src="${mokepon.photo}"
              alt="${mokepon.name}"
            />
          </label>
    `;
    containerCards.innerHTML += optionMokepon;

    // Se guardan las referencias a los inputs de cada mascota
    inputChamaleon = document.getElementById('Chamaleon');
    inputTurtle = document.getElementById('Turtle');
    inputBasur = document.getElementById('Basur');
    inputPydos = document.getElementById('Pydos');
    inputLangosta = document.getElementById('Langosta');
    inputTucapalma = document.getElementById('Tucapalma');
  });

  // Se oculta la seccion de reset al inicio
  sectionReset.style.display = 'none';

  // Se agrega el evento para confirmar la seleccion de mascota
  buttonPetPlayer.addEventListener('click', selectionPetPlayer);

  // Se agrega el evento al boton de reinicio
  buttonReset.addEventListener('click', reset);

  // El jugador se une a la partida pidiendo un id al servidor
  joinGame();
}

// Solicita al backend un id de jugador para identificar la sesion
function joinGame() {
  // fetch('http://localhost:8080/join')
  fetch('/join')
  .then(function (res) {
    if (res.ok) {
      res.text()
        .then(function (respuesta) {
          console.log(respuesta);
          playerId = respuesta;
      });
    }
  });
}

// Se ejecuta al pulsar el boton de seleccionar mascota
function selectionPetPlayer() {
  // Validacion: si no hay ninguna mascota marcada se muestra una alerta
  if (
    inputChamaleon.checked == false &&
    inputTurtle.checked == false &&
    inputBasur.checked == false &&
    inputPydos.checked == false &&
    inputLangosta.checked == false &&
    inputTucapalma.checked == false
  ) {
    alert('You should select a pet');
  } else {
    // Si hay una mascota seleccionada se ocultan las secciones de seleccion
    sectionSelectAttack.style.display = 'none';
    sectionSelectPet.style.display = 'none';

    // Se asigna la mascota elegida al span y a la variable global
    if (inputChamaleon.checked) {
      spanPetPlayer.innerHTML = inputChamaleon.id;
      petPlayer = inputChamaleon.id;
    } else if (inputTurtle.checked) {
      spanPetPlayer.innerHTML = inputTurtle.id;
      petPlayer = inputTurtle.id;
    } else if (inputBasur.checked) {
      spanPetPlayer.innerHTML = inputBasur.id;
      petPlayer = inputBasur.id;
    } else if (inputPydos.checked) {
      spanPetPlayer.innerHTML = inputPydos.id;
      petPlayer = inputPydos.id;
    } else if (inputLangosta.checked) {
      spanPetPlayer.innerHTML = inputLangosta.id;
      petPlayer = inputLangosta.id;
    } else if (inputTucapalma.checked) {
      spanPetPlayer.innerHTML = inputTucapalma.id;
      petPlayer = inputTucapalma.id;
    } else {
      alert('You should select a pet');
    }

    // Se envia al servidor el mokepon seleccionado por el jugador
    selectPet(petPlayer);

    // Se cargan los ataques de la mascota seleccionada y se muestra el mapa
    extractAttacks(petPlayer);
    sectionWatchMap.style.display = 'flex';

    // Se inicia el movimiento en el mapa
    startMap();
  }
}

// Envia al backend el nombre del mokepon elegido para asociarlo al jugador
function selectPet(petPlayer) {
  // fetch(`http://localhost:8080/mokepon/${playerId}`, {
  fetch(`/mokepon/${playerId}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mokepon: petPlayer,
    }),
  });
}

// Dibuja el estado actual del mapa en cada ciclo
function paintCanvas() {
  // Actualiza la posicion de la mascota sumando las velocidades
  petPlayerObject.x = petPlayerObject.x + petPlayerObject.velX;
  petPlayerObject.y = petPlayerObject.y + petPlayerObject.velY;
  // Limpia el canvas y pinta el fondo
  lienzo.clearRect(0, 0, map.width, map.height);
  lienzo.drawImage(mapBackground, 0, 0, map.width, map.height);

  // Pinta la mascota del jugador
  petPlayerObject.paintMokepon();

  // Envia la posicion actual al servidor para sincronizar con otros jugadores
  sendPosition(petPlayerObject.x, petPlayerObject.y);

  // Recorre la lista de enemigos y los dibuja, ademas revisa colision
  mokeponesEnemy.forEach(function (mokepon) {
      mokepon.paintMokepon();
      checkColision(mokepon);
    })
}

// Envia al servidor la posicion actual del jugador y recibe la de los enemigos
function sendPosition(x, y) {
  // fetch(`http://localhost:8080/mokepon/${playerId}/position`, {
  fetch(`/mokepon/${playerId}/position`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      x,
      y
    })
  })
  .then(function (res) {
    if (res.ok) {
      res.json()
      .then(function ({ enemies }) {
        console.log(enemies);
        // Se reconstruye la lista de enemigos con sus datos y posiciones
        mokeponesEnemy = enemies.map(function (enemy) {
          let mokeponEnemy = null
          const mokeponName = enemy.mokepon.name || "";
          if(mokeponName === 'Chamaleon'){
            mokeponEnemy = new Mokepon('Chamaleon','assets/Chamaleon_attack.png',5,'assets/Chamaleon_attack.png', enemy.id);
          } else if( mokeponName === 'Turtle' ) {
            mokeponEnemy = new Mokepon('Turtle','assets/Turtle_attack.png',5,'assets/Turtle_attack.png', enemy.id);
          } else if( mokeponName === 'Basur' ) {
            mokeponEnemy = new Mokepon('Basur','assets/Basur_attack.png',5,'assets/Basur_attack.png', enemy.id);
          } else if( mokeponName === 'Pydos' ) {
            mokeponEnemy = new Mokepon('Pydos','assets/Pydos_attack.png',5,'assets/Pydos_attack.png', enemy.id);
          } else if( mokeponName === 'Tucapalma' ) {
            mokeponEnemy = new Mokepon('Tucapalma','assets/Tucapalma_attack.png',5,'assets/Tucapalma_attack.png', enemy.id);
          } else if( mokeponName === 'Langosta' ) {
            mokeponEnemy = new Mokepon('Langosta','assets/Langosta_attack.png',5,'assets/Langosta_attack.png', enemy.id);
          } 

          // Se actualiza la posicion del enemigo con la recibida del servidor
          mokeponEnemy.x = enemy.x;
          mokeponEnemy.y = enemy.y;
              
          return mokeponEnemy
        })
      })
    }
  })
}

// Funciones sencillas para cambiar la velocidad del mokepon segun la tecla
function moveMokeponUp() {
  petPlayerObject.velY = -5;
}
function moveMokeponLeft() {
  petPlayerObject.velX = -5;
}
function moveMokeponDown() {
  petPlayerObject.velY = 5;
}
function moveMokeponRight() {
  petPlayerObject.velX = 5;
}

// Detiene el movimiento del mokepon
function stopMotion() {
  petPlayerObject.velX = 0;
  petPlayerObject.velY = 0;
}

// Detecta si la mascota del jugador esta colisionando con un enemigo
function checkColision(enemy) {
  const upEnemy = enemy.y;
  const downEnemy = enemy.y + enemy.height;
  const rightEnemy = enemy.x + enemy.width;
  const leftEnemy = enemy.x;

  const upPet = petPlayerObject.y;
  const downPet = petPlayerObject.y + petPlayerObject.height;
  const rightPet = petPlayerObject.x + petPlayerObject.width;
  const leftPet = petPlayerObject.x;

  // Si no hay interseccion de rectangulos se sale sin hacer nada
  if (
    downPet < upEnemy ||
    upPet > downEnemy ||
    rightPet < leftEnemy ||
    leftPet > rightEnemy
  ) {
    return;
  }
  // Si hay colision se detiene el movimiento y se pasa a la fase de combate
  stopMotion();
  sendPosition(petPlayerObject.x, petPlayerObject.y);
  clearInterval(interval);
  console.log('detect colision');
  enemyId = enemy.id
  sectionWatchMap.style.display = 'none';
  sectionSelectAttack.style.display = 'flex';
  selectionPetEnemy(enemy);
}

// Inicia el loop del mapa y los eventos de teclado
function startMap() {
  petPlayerObject = getObjetPet(petPlayer);
  interval = setInterval(paintCanvas, 70);

  window.addEventListener('keydown', pressKey);
  window.addEventListener('keyup', stopMotion);
}

// Gestiona las teclas de direccion para mover el mokepon
function pressKey(event) {
  switch (event.key) {
    case 'ArrowUp':
      moveMokeponUp();
      break;
    case 'ArrowDown':
      moveMokeponDown();
      break;
    case 'ArrowLeft':
      moveMokeponLeft();
      break;
    case 'ArrowRight':
      moveMokeponRight();
      break;

    default:
      break;
  }
}

// Muestra el mensaje final del combate y habilita el boton de reinicio
function finalMessage(finalMessage) {
  let divMessage = document.getElementById('result-div');
  divMessage.innerHTML = finalMessage;

  // Se deshabilita el boton de seleccionar mascota para evitar reiniciar logica
  buttonPetPlayer.disabled = true;

  // Se muestra la seccion de reinicio
  sectionReset.style.display = 'flex';
}

// Funcion auxiliar para devolver un entero aleatorio entre min y max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Extrae los ataques del mokepon seleccionado por el jugador
function extractAttacks(petPlayer) {
  let attacks = [];
  for (let i = 0; i < mokepones.length; i++) {
    if (petPlayer === mokepones[i].name) {
      attacks = mokepones[i].attacks;
    }
  }
  // Se crean los botones de ataque en pantalla
  showButtonsAttacks(attacks);
}

// Devuelve el objeto mokepon correspondiente al jugador
function getObjetPet() {
  for (let i = 0; i < mokepones.length; i++) {
    if (petPlayer === mokepones[i].name) {
      return mokepones[i];
    }
  }
}

// Crea los botones de ataque y los inserta en el contenedor
function showButtonsAttacks(attacks) {
  attacks.forEach((attack) => {
    optionAttack = `
    <button id="${attack.id}" class="button__attack BAttack">${attack.name}</button>
    `;
    containerButtons.innerHTML += optionAttack;
  });
  // Se obtienen referencias a los botones por id y por clase
  buttonFire = document.getElementById('button__fire');
  buttonWater = document.getElementById('button__water');
  buttonGround = document.getElementById('button__ground');
  buttons = document.querySelectorAll('.BAttack');
}

// Registra la secuencia de ataques elegidos por el jugador
function secuenceAttacks() {
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      // Segun el texto del boton se guarda el tipo de ataque
      if (e.target.textContent === 'Fire') {
        usedAttacksPlayer.push('Fire');
        console.log(usedAttacksPlayer);
        button.style.background = 'gray';
        button.disabled = true;
      } else if (e.target.textContent === 'Water') {
        usedAttacksPlayer.push('Water');
        console.log(usedAttacksPlayer);
        button.style.background = 'gray';
        button.disabled = true;
      } else if (e.target.textContent === 'Ground') {
        usedAttacksPlayer.push('Ground');
        console.log(usedAttacksPlayer);
        button.style.background = 'gray';
        button.disabled = true;
      }
      // Cuando el jugador ha elegido cinco ataques se envian al servidor
      if (usedAttacksPlayer.length === 5) {
        sendAttacks()
      }
    });
  });
}

// Envia al backend la lista de ataques seleccionados por el jugador
function sendAttacks() {
  // fetch(`http://localhost:8080/mokepon/${playerId}/attacks`,{
  fetch(`/mokepon/${playerId}/attacks`,{
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      attacks: usedAttacksPlayer
    })
  })
  // Se inicia un intervalo para consultar los ataques del enemigo
  interval = setInterval(getAttackks, 80)
}

// Consulta periodicamente los ataques del enemigo hasta que tenga cinco
function getAttackks() {
  // fetch(`http://localhost:8080/mokepon/${enemyId}/attacks`)
  fetch(`/mokepon/${enemyId}/attacks`)
  .then(function (res) {
    if(res.ok) {
      res.json()
      .then(function ({attacks}) {
        if(attacks.length === 5) {
          attackEnemy = attacks
          combatResult()
        }
      })
    }
  })
}

// Configura el nombre y ataques del enemigo al entrar en combate
function selectionPetEnemy(enemy) {
  petEnemy.innerHTML = enemy.name;
  attacksMokeponEnemy = enemy.attacks;
  // Se activan los eventos para que el jugador empiece a elegir ataques
  secuenceAttacks();

  return petEnemy;
}

// Logica anterior de ataque aleatorio del enemigo (ya no se usa en modo online)
function randomAttackEnemy() {
  startMessage.style.display = 'none';

  let randomAttack = random(0, attacksMokeponEnemy.length - 1);

  if (randomAttack == 0 || randomAttack == 1) {
    attackEnemy.push('Fire');
  } else if (randomAttack == 3 || randomAttack == 4) {
    attackEnemy.push('Water');
  } else {
    attackEnemy.push('Ground');
  }
  console.log(attackEnemy);
  startBattle();
}

// Inicia la batalla cuando el jugador ya eligio todos sus ataques
function startBattle() {
  if (usedAttacksPlayer.length === 5) {
    combatResult();
  }
}

// Muestra el resultado parcial de cada ronda y los ataques usados
function createMessage(result) {
  let newAttackPlayer = document.createElement('p');
  let newAttackEnemy = document.createElement('p');

  resultDiv.innerHTML = result;
  newAttackPlayer.innerHTML = indexAttackPlayer;
  newAttackEnemy.innerHTML = indexAttackEnemy;

  attackPlayerDiv.appendChild(newAttackPlayer);
  attackEnemyDiv.appendChild(newAttackEnemy);
}

// Actualiza los indices de ataque actuales para el jugador y el enemigo
function indexBothOponents(player, enemy) {
  indexAttackPlayer = usedAttacksPlayer[player];
  indexAttackEnemy = attackEnemy[enemy];
}

// Recorre los ataques de ambos y calcula el resultado de la batalla
function combatResult() {
  clearInterval(interval)
  for (let index = 0; index < usedAttacksPlayer.length; index++) {
    if (usedAttacksPlayer[index] === attackEnemy[index]) {
      indexBothOponents(index, index);
      createMessage('DRAW');
    } else if (
      usedAttacksPlayer[index] == 'Fire' &&
      attackEnemy[index] == 'Ground'
    ) {
      indexBothOponents(index, index);
      createMessage('YOU WIN');
      victoriesPlayer++;
      petPlayerLife.innerHTML = victoriesPlayer;
    } else if (
      usedAttacksPlayer[index] == 'Water' &&
      attackEnemy[index] == 'Fire'
    ) {
      indexBothOponents(index, index);
      createMessage('YOU WIN');
      victoriesPlayer++;
      petPlayerLife.innerHTML = victoriesPlayer;
    } else if (
      usedAttacksPlayer[index] == 'Ground' &&
      attackEnemy[index] == 'Water'
    ) {
      indexBothOponents(index, index);
      createMessage('YOU WIN');
      victoriesPlayer++;
      petPlayerLife.innerHTML = victoriesPlayer;
    } else {
      indexBothOponents(index, index);
      createMessage('YOU LOSE');
      victoriesEnemy++;
      petEnemyLife.innerHTML = victoriesEnemy;
    }
    // Se actualizan los contadores en pantalla en cada ronda
    petPlayerLife.innerHTML = victoriesPlayer;
    petEnemyLife.innerHTML = victoriesEnemy;
  }
  // Despues de comparar todos los ataques se decide el ganador final
  checkLife();
}

// Decide el mensaje final segun las victorias del jugador y del enemigo
function checkLife() {
  if (victoriesPlayer == victoriesEnemy) {
    finalMessage('ITs A DRAW');
  } else if (victoriesPlayer > victoriesEnemy) {
    finalMessage('YEEEES YOU WIN');
  } else {
    finalMessage('SORRY YOU LOSE');
  }
}

// Refresca la pagina para reiniciar el juego
function reset() {
  location.reload();
}

// Inicia todo el juego cuando la ventana termina de cargar
window.addEventListener('load', startGame);
